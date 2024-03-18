<template>
  <div class="site-content">
    <div class="container">
        <div class="login">
          <h1>Login</h1>
        </div>
        <form @submit.prevent="loginUser" class="form-container">
          <div class="form-group">
            <label class="icon" for="email"><i class="fas fa-envelope"></i></label>
            <div class="input-container">
              <input class="form-control" type="email" id="email" v-model="username" required autocomplete="off"
                @input="error = ''" :class="{ 'invalid-email': username && !validateEmail(username) }">
            </div>
          </div>
          <p v-if="username && !validateEmail(username)" class="error-message">Por favor, insira um e-mail válido.</p>
          <div class="form-group">
            <label class="icon" for="password"><i class="fas fa-key"></i></label>
            <div class="input-container">
              <input class="form-control" type="password" id="password" v-model="password" required autocomplete="off">
            </div>
          </div>
          <div class="button-container">
            <button class="btn btn-success" type="submit" @click="loginUser">Login</button>
          </div>
        </form>
        <div>
          <p>
            Você não tem uma conta?
            <router-link @click="goToSingOnPage" to="{ name: 'SingOnPage' }">
              Crie sua conta
            </router-link>
          </p>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    loginUser() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === this.username && u.password === this.password);

      if (user) {
        this.$router.push({ name: 'HomePage' })
        this.$emit('login', user);
      } else {
        this.error = 'Usuário ou senha incorretos.';
      }
    },

    goToSingOnPage() {
      this.$router.push({ name: 'SingOnPage' });
    },

    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&family=Source+Sans+3:wght@900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

.container {
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 100%;
    background-color: rgba(240, 248, 255, 0.616);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 50%;
    width: 400px;
    
}

.login {
  font-family: 'Montserrat', sans-serif;
  padding-bottom: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding-left: 16px;
}

.icon {
  margin-right: 10px;
}

.input-container {
  flex: 1;
}

.button-container {
  margin: 15px auto;
  text-align: center;
  width: 100%;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.invalid-email {
  border: 1px solid red;
}

@media (max-width: 600px) {
    .container {
        width: 100%;
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

    .form-group {
        max-width: 100%;
    }

    .form-control {
        width: 100%;
    }
}
</style>
