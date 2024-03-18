<template>
    <div class="menu-toggle" @click="toggleMenu" :class="{ 'fixed-icon': isMenuOpen }">
        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'">
        </i>
    </div>

    <!-- Menu Lateral -->
    <aside class="sidebar" :class="{ 'sidebar-open': isMenuOpen }">
        <div class="title-menu">
            <h2>Agenda</h2>
        </div>
        <ul class="list-menu">
            <li @click="toHome('HomePage')" class="list">Página inicial</li>
            <li @click="goTo('AddEvent')" class="list">Agendar atendimento</li>
            <li @click="navigateTo('EventList')" class="list">Agendamentos</li>
            <li @click="backTo('LoginPage')" class="list-1">Sair</li>
        </ul>
    </aside>
    <div class="site-content">
        <div class="container">
            <h1>Agenda</h1>
            <form @submit.prevent="addEvent">
                <div class="form-group">
                    <label for="title">
                        <strong>
                            Cliente
                        </strong>
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="title" v-model="newlocalEvent.title" required
                            autocomplete="off" placeholder="Digite aqui" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="phone"><strong>Telefone</strong></label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="phone" v-model="newlocalEvent.phoneNumber"
                            placeholder="(DDD) _____-____" @input="formatPhoneNumber" required autocomplete="off" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="value">
                        <strong>
                            Valor
                        </strong>
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="value" @input="formatCurrency"
                            v-model="newlocalEvent.value" required autocomplete="off" placeholder="Digite o valor" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="category">
                        <strong>
                            Procedimento
                        </strong>
                    </label>
                    <div class="input-group">
                        <textarea class="form-control" id="category" v-model="newlocalEvent.category" required
                            autocomplete="off" placeholder="Digite aqui">
                        </textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label for="time">
                        <strong>
                            Horário
                        </strong>
                    </label>
                    <div class="input-group">
                        <input type="time" class="form-control" id="time" required v-model="newlocalEvent.time"
                            autocomplete="off" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="date">
                        <strong>
                            Data
                        </strong>
                    </label>
                    <div>
                        <div class="input-group">
                            <input type="date" class="form-control" id="date" v-model="newlocalEvent.date" required
                                autocomplete="off" />
                        </div>
                    </div>
                </div>
                <div class="btn-container">
                    <div class="btn-group" v-if="isResetVisible">
                        <button type="reset" class="btn btn-danger" @click="resetForm">
                            <i class="fas fa-trash-alt">
                            </i>
                        </button>
                    </div>
                    <div class="button-container" :class="{ 'centered': !isResetVisible }">
                        <button type="submit" class="btn btn-success" @click="validateFields">
                            Salvar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddEvent',

    data() {
        return {
            isMenuOpen: false,
            newlocalEvent: {
                title: '',
                phoneNumber: '',
                value: '',
                category: '',
                date: '',
                time: ''
            },
            isResetVisible: false
        };
    },
    methods: {
        closeAddEvent() {
            this.$router.push({ name: 'HomePage' });
        },

        navigateToEventList() {
            this.$router.push({ name: 'EventList' });
        },

        addEvent() {
            if (
                this.newlocalEvent.title &&
                this.newlocalEvent.phoneNumber &&
                this.newlocalEvent.value &&
                this.newlocalEvent.category &&
                this.newlocalEvent.date &&
                this.newlocalEvent.time
            ) {
                this.$emit('eventAdded', this.newlocalEvent);
                this.clearFields();
            }
        },

        formatCurrency(event) {
            let input = event.target.value;
            const onlyDigits = input.replace(/\D/g, '');
            const numericValue = Number(onlyDigits) / 100;
            const currencyFormat = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const formatValue = currencyFormat.format(numericValue);
            this.newlocalEvent.value = formatValue;
        },

        formatPhoneNumber() {
            let cleaned = this.newlocalEvent.phoneNumber.replace(/\D/g, '');
            let formattedNumber = '';

            if (cleaned.length > 0) {
                formattedNumber = `(${cleaned.slice(0, 2)})`;

                if (cleaned.length > 2 && cleaned.length <= 7) {
                    formattedNumber += ` ${cleaned.slice(2)}`;
                } else if (cleaned.length > 7 && cleaned.length <= 11) {
                    formattedNumber += ` ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
                } else if (cleaned.length > 11) {
                    formattedNumber += ` ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
                }
            }

            this.newlocalEvent.phoneNumber = formattedNumber;
        },

        clearFields() {
            this.newlocalEvent = {
                title: '',
                phoneNumber: '',
                value: '',
                category: '',
                date: '',
                time: ''
            };
        },

        validateFields(event) {
            event.preventDefault();

            if (
                this.newlocalEvent.title &&
                this.newlocalEvent.phoneNumber &&
                this.newlocalEvent.value &&
                this.newlocalEvent.category &&
                this.newlocalEvent.date &&
                this.newlocalEvent.time
            ) {
                this.addEvent();
                this.navigateToEventList();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios!');
            }
        },

        checkInputs() {
            for (const field in this.newlocalEvent) {
                if (this.newlocalEvent[field].trim() !== '') {
                    this.isResetVisible = true;
                    return;
                }
            }
            this.isResetVisible = false
        },

        resetForm() {
            this.clearFields();
            this.isResetVisible = false;
        },


        toHome(HomePage) {
            this.$router.push({ name: HomePage });
            this.closeMenu();
        },

        navigateTo(AddEvent) {
            this.$router.push({ name: AddEvent });
            this.closeMenu();
        },

        goTo(EventList) {
            this.$router.push({ name: EventList });
            this.closeMenu();
        },

        backTo(LoginPage) {
            this.$router.push({ name: LoginPage });
            this.closeMenu();
        },

        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },

        closeMenu() {
            this.isMenuOpen = false;
        }
    },

    watch: {
        newlocalEvent: {
            handler() {
                this.checkInputs();
            },
            deep: true
        }
    }
};
</script>





<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
@import '~bootstrap/dist/css/bootstrap.css';
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');



.container {
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 100%;
    background-color: rgba(240, 248, 255, 0.616);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 830px;
    width: 400px;
    margin: 20px auto;
}



h1 {
    font-family: 'Montserrat', sans-serif;
    color: #333;
    text-align: center;
    padding-bottom: 40px;
    margin: 0;
}

.form-group {
    flex: 1 1 50%;
    padding: 5px;
    box-sizing: border-box;
    max-width: 300px;
    margin-bottom: 25px;
}


label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
}

.input-group {
    border-radius: 350px;
}

textarea {
    height: 30px;
    width: 300px;
    resize: none;
}

.btn-container {
    width: 300px;
    display: flex;
    justify-content: space-around;
}

.btn-danger {
    cursor: pointer;
    border-radius: 20px;
}

.btn-success {
    cursor: pointer;
    width: 225px;
    border-radius: 25px;
}

.centered {
    display: flex;
    justify-content: center;
}

.close-container {
    padding-left: 100%;
    margin-bottom: 100px;
}

.close {
    padding-left: 100%;
    margin-bottom: 100px;
    text-align: right;
    background-color: rgba(240, 248, 255, 0.616);
    border: none;
}

.fa-times {
    font-size: 1.5em;
    background-color: rgba(240, 248, 255, 0.616);
    color: black;
}


.menu-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    cursor: pointer;
    font-size: 20px;
    z-index: 2;
    transition: left 0.3s ease, right 0.3s ease;
}


.fixed-icon {
    position: fixed;
    right: 20px;
    top: 20px;
    left: 175px;
}

.menu-toggle.fixed-icon {
    transition: left 0.3s ease, right 0.3s ease;
}

.menu-toggle i {
    transition: transform 0.3s ease;
    /* Adiciona animação ao ícone do menu */
}

.menu-toggle.open {
    transform: rotate(90deg);
    /* Rotação do ícone quando o menu está aberto */
}

.sidebar {
    width: 200px;
    background-color: #f8f9fa;
    height: 100vh;
    position: fixed;
    top: 0;
    left: -200px;
    /* Inicia fechado */
    padding-top: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease;
    z-index: 1;
}

.title-menu h2 {
    font-weight: bold;
    padding-left: 10px;
    padding-top: 0;
    color: #5E2C8C;
    font-size: 1.8em;
}

.list-menu {
    margin-top: 50px;
}

.list {
    padding-left: 10px;
    cursor: pointer;
}

.list:hover {
    background-color: #c386fc;
    color: white;
    transition: 0.3s ease;
    width: 100%;
}

.list-1 {
    padding-left: 10px;
    cursor: pointer;
}

.list-1:hover {
    background-color: red;
    color: white;
    transition: 0.3s ease;
    width: 100%;
}

.sidebar-open {
    left: 0;
}

.list-menu {
    list-style: none;
    padding: 0;
    padding-top: 0;
}


@media (max-width: 600px) {
    .container {
        width: 100%;
    }

    .sidebar {
        position: fixed;
    }

    .form-group {
        max-width: 100%;
    }

    .form-control {
        width: 100%;
    }
}

@media (min-width: 601px) and (max-width: 1024px) {
    .container {
        width: 80%;
        margin: auto;
        justify-content: center;
        align-items: center;
    }

    .sidebar {
        position: fixed;
    }

    .form-group {
        max-width: 100%;
    }

    .form-control {
        width: 100%;
    }
}
</style>
