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
        <h1>
          Anotações
        </h1>
      </div>
      <div class="close-container">
        <button type="button" class="close" @click="closeEventList">
          <i class="fas fa-times">
          </i>
        </button>
      </div>
      <ul class="list-group" v-if="localEvents.length > 0">
        <li class="list-group-item" v-for="(event, eventIndex) in localEvents" :key="eventIndex">
          <div>
            <div class="mt-4">
              <div class="event-item">
                <i class="fas fa-calendar-alt"></i>
                <div class="event-info">
                  <div class="title-item">
                    <p>
                      <u>
                        {{ event.title }}
                      </u>
                    </p>
                  </div>
                  <div class="sub">
                    <p> {{ event.phoneNumber }} </p>
                    <span class="separator"></span>
                    <p> {{ event.value }} </p>
                    <span class="separator"></span>
                    <p> {{ event.category }} </p>
                    <span class="separator"></span>
                    <p> {{ event.time }} </p>
                    <span class="separator"></span>
                    <p> {{ formatDate(event.date) }}</p>
                  </div>
                </div>
                <div class="button-container">
                  <div class="btn-group">
                    <button type="button" class="btn" @click="openModal(event, eventIndex)">
                      <i class="fas fa-trash-alt">
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="no-events-message">
        <h2>
          Nenhuma anotação realizada.
        </h2>
      </div>
      <div class="btn-container">
        <div class="btn-group">
          <button type="button" class="btn btn-primary" @click="goToAddEvent">
            + Criar anotação
          </button>
        </div>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Deseja excluir essa anotação?
            </h5>
          </div>
          <div class="modal-body">
            <p>
              Você está prestes a deletar uma anotação e esta ação não poderá ser
              desfeita. Tem certeza que deseja excluí-la?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancelar
            </button>
            <button class="btn btn-danger" @click="deleteEvent">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventList',
  emits: ['eventAdded', 'eventsUpdated'],
  props: {
    events: {
      type: Array,
      default: () => { }
    }
  },

  data() {
    return {
      localEvents: [],
      isMenuOpen: false,
      showModal: false,
      selectedEvent: null,
      selectedEventIndex: null
    };
  },

  created() {
    this.localEvents = JSON.parse(JSON.stringify(this.events));
  },

  methods: {
    openModal(event, eventIndex) {
      this.selectedEvent = event;
      this.selectedEventIndex = eventIndex;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    closeEventList() {
      this.$router.push({ name: 'HomePage' });
    },

    saveChanges() {
      localStorage.setItem('events', JSON.stringify(this.localEvents));
      this.$emit('eventsUpdated', this.localEvents);
    },

    deleteEvent() {
      if (this.selectedEventIndex !== null) {
        this.localEvents.splice(this.selectedEventIndex, 1);
        localStorage.setItem('events', JSON.stringify(this.localEvents));
        this.$emit('eventsUpdated', this.localEvents);
        this.closeModal();
      }
    },

    formatDate(date) {
      if (!date) return '';
      const eventDate = new Date(date);
      if (isNaN(eventDate.getTime())) {
        return 'Data inválida';
      }
      const day = String(eventDate.getDate()).padStart(2, '0');
      const month = String(eventDate.getMonth() + 1).padStart(2, '0');
      const year = eventDate.getFullYear();
      return `${day}/${month}/${year}`;
    },

    goToAddEvent() {
      this.$router.push({ name: 'AddEvent' });
    },

    goToHomePage() {
      this.$router.push({ name: 'HomePage' });
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
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

.container {
  position: relative;
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

.title {
  font-family: 'Montserrat', sans-serif;
}

.list-group {
  max-height: 450px;
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
}

.list-group-item {
  position: relative;
  background-color: rgba(240, 248, 255, 0.616);
  padding: 0px;
  border: none;
}

.event-item {
  height: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title-item p {
  font-size: 1.3em;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
}

.sub {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: left;
}

.sub p {
  font-size: 0.6em;
  white-space: nowrap;
  overflow: hidden;
}

.event-info {
  width: 80%;
  font-size: 16px;
  padding: 9px;
  margin-top: 10px;
}

.separator {
  margin: 0 2px;
  color: black;
}

.btn-primary {
  background-color: #c386fc;
  color: white;
  width: 225px;
  border-radius: 25px;
  border: none;
}

.btn-primary:hover {
  color: white;
  background-color: #c386fc;
  border: none;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: none;
  margin: auto;
}

.modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}


.modal-body {
  text-align: left;
}


.modal-content {
  width: 100%;
  height: 100%;
  border-radius: 9px;
  display: flex;
  margin: auto;
}

.btn-danger {
  border-radius: 50px;
}

.btn-secondary {
  border-radius: 50px;
}

.modal.is-active {
  width: 100%;
  background: rgba(0, 0, 0, 0.79);
  display: flex;
  align-items: center;
  justify-content: center;
}


.no-events-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.close-container {
  position: absolute;
  top: 15px;
  padding-left: 95%;
  width: 96%;
  display: flex;
  justify-content: right;
  padding-bottom: 15px;
  text-align: right;
}

.close {
  text-align: right;
  background-color: rgba(240, 248, 255, 0.616);
  border: none;
}

.fa-times {
  font-size: 1.5em;
  border: none;
  background-color: rgba(240, 248, 255, 0.616);
  color: black;
}

.fa-trash-alt {
  color: red;
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

  .list-group {
    width: 100%;
  }

  .btn-content {
    margin-top: 100px;
    margin-left: 165px;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .container {
    width: 80%;
  }

  .sidebar {
    position: fixed;
  }
}
</style>