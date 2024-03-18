<template>
  <div class="site-content">
    <div class="container">
      <div class="title">
        <h1>Crie uma nova conta</h1>
      </div>
      <form @submit.prevent="cadastroUser" class="form-container">
        <div class="form-group">
          <label class="icon" for="name">Nome:</label>
          <div class="input-container">
            <input class="form-control" id="name" type="text" placeholder="Insira seu nome" v-model="localEvent.name" required
              autocomplete="off">
          </div>
        </div>
        <div class="form-group">
          <label class="icon" for="date">
            Data de nascimento:
          </label>
          <div class="input-container">
            <input class="form-control" id="date" type="date" v-model="localEvent.date" required autocomplete="off" />
          </div>
        </div>
        <div class="form-group">
          <label class="icon" for="document">CPF/CNPJ:</label>
          <div class="input-container">
            <input class="form-control" id="document" type="text" placeholder="xxx-xxx-xxx-xx" v-model="localEvent.document"
              @input="formatDocument" required maxlength="18" autocomplete="off">
          </div>
        </div>
        <div class="form-group">
          <label class="icon" for="phone">Telefone:</label>
          <div class="input-container">
            <input class="form-control" id="phone" type="text" placeholder="(xx) xxxxx-xxxx" v-model="localEvent.phoneNumber"
              @input="formatPhoneNumber" required autocomplete="off">
          </div>
        </div>
        <div class="form-group">
          <label class="icon" for="email">E-mail:</label>
          <div class="input-container">
            <input class="form-control" id="email" type="text" placeholder="Insira seu e-mail" v-model="localEvent.userName" required
              autocomplete="off">
          </div>
        </div>
        <div class="form-group">
          <label class="icon" for="password">Senha:</label>
          <div class="input-container">
            <input class="form-control" id="password" type="password" placeholder="Insira sua senha" v-model="localEvent.password" required
              autocomplete="off">
          </div>
        </div>
        <div class="button-container">
          <button class="btn btn-success" type="submit" @click="singUser">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SingOnPage',

  data() {
    return {
      localEvent: {
        name: '',
        document: '',
        phoneNumber: '',
        userName: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    singUser() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = users.find(u => u.username === this.localEvent.userName);
      
      if (existingUser) {
        // Usuário já existe, exibir mensagem de erro
        this.error = 'Este usuário já existe. Por favor, escolha outro nome de usuário.';
      } else {
        // Adicionar novo usuário ao armazenamento local
        users.push({
          username: this.localEvent.userName,
          password: this.localEvent.password,
          
        });
        localStorage.setItem('users', JSON.stringify(users));
        
        // Redirecionar para a página de login ou emitir um evento para o componente pai
        this.$router.push({ name: 'LoginPage' });
        this.$emit('signup');
      }
    },

    navigateToLoginPage() {
      this.$router.push({ name: 'LoginPage' });
    },

    formatPhoneNumber() {
      let cleaned = this.localEvent.phoneNumber.replace(/\D/g, '');
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
      this.localEvent.phoneNumber = formattedNumber;
    },

    formatDocument() {
      let cleaned = this.localEvent.document.replace(/\D/g, '');
      let formattedDocument = '';

      if (cleaned.length <= 11) {
        formattedDocument = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      } else {
        formattedDocument = cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      }

      this.localEvent.document = formattedDocument;
    },

    validateFields() {
      if (
        this.localEvent.name &&
        this.localEvent.document &&
        this.localEvent.phoneNumber &&
        this.localEvent.password &&
        this.localEvent.userName 
      ) {
        this.navigateToLoginPage();
      } else {
        alert('Por favor, preencha todos os campos obrigatórios!');
      }
    }
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

.title {
  font-family: 'Montserrat', sans-serif;
  padding-bottom: 20px;
}

.form-group {
  flex: 1 1 50%;
  padding: 5px;
  box-sizing: border-box;
  max-width: 300px;
  margin-bottom: 25px;
}

.form-control {
  width: 100%;
  padding-left: 16px;
}

.icon {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.input-container {
  flex: 1;
}

.button-container {
  margin: 15px auto;
  text-align: center;
  width: 100%;
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
  