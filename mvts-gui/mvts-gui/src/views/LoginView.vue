<script setup>
import { POTSlogin } from '@/client/AuthClient';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const message = ref('');

const router = useRouter()

async function login() {
  // if (username.value === 'admin' && password.value === '1234') {
  //   router.push('/home') // o cualquier ruta dentro del layout
  // } else {
  //   message.value = 'Username or password incorrect.'
  // }
  const loginResponse = await POTSlogin({
    email: username.value,
    password: password.value
  })
  if (loginResponse.success) {
    router.push('/home') // o cualquier ruta dentro del layout
  } else {
    message.value = 'Username or password incorrect.'
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
