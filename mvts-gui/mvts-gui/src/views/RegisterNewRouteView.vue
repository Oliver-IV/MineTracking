<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { testLocations } from '@/mockData/Locations';

// Usar el router
const router = useRouter();
const locations = testLocations;

// Definir selectedLocation para almacenar la selección
const selectedOrigen = ref<string | null>(null);
const departureTime = ref<string | null>(null);
const arrivaleTime = ref<string | null>(null);

// Función para volver atrás
function goBack() {
    router.back();
}
</script>

<template>
    <div class="main-layout">
        <div class="header">
            <h1>Create New Route</h1>
            <div class="button-container">
                <button @click="goBack" class="back-button">Back</button>
                <button class="register-button">Register</button>
            </div>
        </div>
        <div class="container">
            <div class="route-container">
                <div class="details">
                    <p>Select Origen</p>
                    <select v-model="selectedOrigen" name="cargo-origen" id="cargo-origen">
                        <option v-for="(location, index) in locations" :key="index" :value="location.name">
                            {{ location.name }}
                        </option>
                    </select>
                    <p>Select Destination</p>
                    <select v-model="selectedOrigen" name="cargo-origen" id="cargo-origen">
                        <option v-for="(location, index) in locations" :key="index" :value="location.name">
                            {{ location.name }}
                        </option>
                    </select>
                    <p>Select Departure Time</p>
                    <input type="time" v-model="departureTime" id="departure-time" name="departure-time">
                    <p>Estimated Arrival Time</p>
                    <input type="time" v-model="arrivaleTime" id="departure-time" name="departure-time">
                </div>
            </div>
            <div class="map">

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

.container {
    display: flex;
    justify-content: space-evenly;
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

.container {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    padding-top: 0;
}

.button-container {
    display: flex;
    gap: 10px;
}

.route-container {
    flex: 1;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
    padding: 1rem;

}

.map {
    flex: 2;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
}
</style>
