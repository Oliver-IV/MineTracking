<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { CreateCarDto } from '@/types/back/carDto/create-car.dto';
import { MeasurementUnit } from '@/types/back/carDto/measurement-unit';
import { CarType } from '@/types/back/carDto/cart.type';
import { createCar } from '@/client/CarsClient';


const router = useRouter();

const name = ref('');
const capacityId = ref('');
const measurementUnit = ref(0);
const type = ref(0);
const capacityValue = ref(0);
const state = ref(''); async function registerVehicle() {
    const vehicleData: CreateCarDto = {
        name: name.value,
        capacity: {
            id: 0,
            measurementUnit: measurementUnit.value,
            value: capacityValue.value
        },
        type: type.value,
        state: state.value
    };

    try {
        const result = await createCar(vehicleData);
        console.log('Vehicle registered:', result);

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


                <select v-model="measurementUnit">
                    <option :value="0">Kilograms (KG)</option>
                    <option :value="1">Tons (TON)</option>
                    <option :value="2">Kilotons (KTON)</option>
                </select>

                <input type="number" min="1" placeholder="Capacity" v-model="capacityValue">
                <select v-model="type">
                    <option :value="0">Heavy</option>
                    <option :value="1">Medium</option>
                    <option :value="2">Light</option>
                    <option :value="-1">UNRECOGNIZED</option>

                </select>
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