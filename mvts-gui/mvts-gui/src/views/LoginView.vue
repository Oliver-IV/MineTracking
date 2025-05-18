<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === '1234') {
        this.message = 'Login exitoso';
      } else {
        this.message = 'Usuario o contraseña incorrectos';
      }
    }
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <input v-model="username" type="text" placeholder="Usuario" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="login">Entrar</button>
    <p class="message">{{ message }}</p>
  </div>
</template>

<style>
.login-container {
  width: 300px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}
.login-container h2 {
  text-align: center;
  margin-bottom: 20px;
}
.login-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.login-container button:hover {
  background-color: #0056b3;
}
.message {
  text-align: center;
  margin-top: 15px;
  color: red;
}
</style>
