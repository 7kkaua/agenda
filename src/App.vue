<template>
  <div id="app">
    <div class="content">
      <div class="container mt-4">
        <router-view :events="eventsList" @eventAdded="handleEventAdded" @eventsUpdated="updatedEventsList"
          @login="handleLogin" @signup="handleSignup">
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      eventsList: [],
      currentUser: null // Estado para armazenar o usuário logado
    };
  },
  created() {
    const savedEvents = localStorage.getItem('events');
    this.eventsList = savedEvents ? JSON.parse(savedEvents) : [];
  },
  methods: {
    handleEventAdded(newEvent) {
      this.eventsList.push(newEvent);
      this.updateEvents();
    },
    updatedEventsList(updatedEvents) {
      this.eventsList = updatedEvents;
      this.updateEvents();
    },
    updateEvents() {
      localStorage.setItem('events', JSON.stringify(this.eventsList));
    },
    handleLogin(user) {
      // Define o usuário logado
      this.currentUser = user;
      // Você pode redirecionar para a página inicial ou fazer outras ações necessárias
      this.$router.push({ name: 'HomePage' }); // Exemplo de redirecionamento para a página inicial
    },
    handleSignup() {
      // Implemente as ações necessárias após o cadastro, como redirecionar para a página de login
      this.$router.push({ name: 'LoginPage' }); // Exemplo de redirecionamento para a página de login após o cadastro
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 8px;

}

::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 6px;
}

::-moz-scrollbar {
  width: 12px;
}

::-moz-scrollbar-thumb {
  background-color: gray;
  border-radius: 6px;
}
</style>