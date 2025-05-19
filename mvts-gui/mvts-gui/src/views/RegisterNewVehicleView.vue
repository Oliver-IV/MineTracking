<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const name = ref('');
const capacity = ref('');
const type = ref(0);
const state = ref('');
async function registerVehicle() {
    const vehicleData = {
        name: name.value,
        capacity: capacity.value,
        type: type.value,
        state: state.value
    };

    try {
        const response = await fetch(' ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicleData)
        });

        if (!response.ok) {
            throw new Error('NAH FAM');
        }

        const result = await response.json();
        console.log('Vehicle registered:', result);
        // Redireccionar o mostrar mensaje de éxito
    } catch (error) {
        console.error('Registration failed:', error);
    }
}

function goBack() {
    router.back();
}
</script>
<template>
    <div class="main-layout">
        <div class="container">
            <div class="header">
                <h1>Register New Vehicle</h1>
                <div class="button-container">
                    <button @click="goBack" class="back-button">Back</button>
                    <button @click="registerVehicle" class="register-button">Register</button>
                </div>
            </div>

            <div class="car-inforamtion">
                <h2>Vehicle Details</h2>
                <input type="text" placeholder="Name" v-model="name" />
                <input type="text" placeholder="Capacity" v-model="capacity" />
                <input type="number" placeholder="Type" v-model="type" />
                <input type="text" placeholder="State" v-model="state" />
            </div>
        </div>
    </div>


</template>

<style scoped>
.main-layout {
    border-radius: 20px;
    border: solid 1px #D1D5DB;
    margin-top: 2rem;
}


.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.back-button {
    background-color: #FFFFFF;
    border-radius: 20px;
    height: 40px;
    padding: 0 40px;
    border: solid 1px #D1D5DB;
}

.register-button {
    border-radius: 25px;
    border: none;
    background-color: #3b82f6;
    color: #fff;
    height: 40px;
    padding: 0 40px;
    border: solid 1px #D1D5DB;
}

.car-inforamtion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem;
    max-width: 20%;

}
</style>