<template>
    <div class="menu-toggle" @click="toggleMenu" :class="{ 'fixed-icon': isMenuOpen }">
        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'">
        </i>
    </div>

    <!-- Menu Lateral -->
    <aside class="sidebar" :class="{ 'sidebar-open': isMenuOpen }">
        <div class="title-menu">
            <h1>Agenda</h1>
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
            <div class="title">
                <i class="fas fa-calendar-alt"></i>
                <h1>
                    Agenda
                </h1>
                <h2>
                    by Kauã
                </h2>
            </div>
            <div class="btn-container">
                <button type="button" class="btn btn-primary" @click="goToAddEvent">
                    + Agendar atendimento
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HomePage',
    data() {
        return {
            isMenuOpen: false
        }
    },

    methods: {
        goToAddEvent() {
            this.$router.push({ name: 'AddEvent' });
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
    }
};
</script>

<style scoped>
.container {
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 100%;
    background-color: rgba(240, 248, 255, 0.616);
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 600px;
    width: 400px;
    margin: 20px auto;
}

.fa-calendar-alt {
    color: black;
    padding-top: 40px;
    font-size: 3em;
}

.title {
    padding-top: 30%;
}

h1 {
    font-weight: bold;
    color: #5E2C8C;
    padding-top: 30%;
}

h2 {
    font-size: medium;
}

.btn-container {
    padding-bottom: 50%;
    margin: auto;
}

.btn-primary {
    margin: auto;
    border: none;
    border-radius: 25px;
    background-color: #c386fc;
}

.btn-primary:hover {
    background-color: #c386fc;
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

.title-menu h1 {
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
}
</style>