<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { POSTregister } from '@/client/AuthClient';

const name = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();

const createAccount = async () => {
  try {
    const response = await POSTregister({
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    });
    console.log(response);

    if (response) {
      message.value = 'Account created successfully!';
      router.push('/login');  // Redirigir a la página de login
    } else {
      message.value = 'Error during registration.';
    }
  } catch (error) {
    message.value = `Registration failed: ${error.message}`;
  }
};
</script>


<template>
  <div class="register-container">
    <h1>Create Account</h1>
    <input type="text" placeholder="Name" v-model="name" />
    <input type="text" placeholder="Last Name" v-model="lastName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="createAccount">Register</button>
    <p class="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.register-container {
  width: 40%;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}


.register-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.register-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-container button:hover {
  background-color: #0056b3;
}
</style>