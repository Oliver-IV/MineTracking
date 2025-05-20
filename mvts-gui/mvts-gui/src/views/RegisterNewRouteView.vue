<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

import type { LocationDTO } from '@/types/back/routeDto/location.dto';
import { GETfindAllLocations, POSTcreateRoute } from '@/client/RoutesClient';

const router = useRouter();
const locations = ref<LocationDTO[]>();
const loaded = ref(false);
const loading = ref(true);

const selectedOrigen = ref<string | null>(null);
const selectedDestination = ref<string | null>(null);
const departureTime = ref<string | null>(null);
const arrivaleTime = ref<string | null>(null);

function goBack() {
    router.back();
}

async function loadLocations() {
    try {
        loading.value = true;
        const loadedLocations = await GETfindAllLocations();
        console.log(loadedLocations);
        locations.value = loadedLocations ;
        loaded.value = true;
    } catch (error) {
        console.error("Error loading locations:", error);
    } finally {
        loading.value = false;
    }
}

async function registerRoute() {
    if (!selectedOrigen.value || !selectedDestination.value) {
        alert("Please select both an origin and a destination.");
        return;
    }

    const startLocation = locations.value?.find(loc => loc.name === selectedOrigen.value);
    const endLocation = locations.value?.find(loc => loc.name === selectedDestination.value);

    if (!startLocation || !endLocation) {
        alert("Invalid origin or destination selected.");
        return;
    }

    try {
        const postResponse = await POSTcreateRoute({
            startId: startLocation.id,
            endId: endLocation.id
        });

        console.log("Route created successfully:", postResponse);
        alert("Route created successfully!");
        router.push('/routes');
    } catch (error) {
        console.error("Error creating route:", error);
        alert("Failed to create route.");
    }
}

onMounted(() => {
    loadLocations();
});

</script>

<template>
    <div class="main-layout">
        <div class="header">
            <h1>Create New Route</h1>
            <div class="button-container">
                <button @click="goBack" class="back-button">Back</button>
                <button class="register-button" @click="registerRoute">Register</button>
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
                    <select v-model="selectedDestination" name="cargo-origen" id="cargo-origen">
                        <option v-for="(location, index) in locations" :key="index" :value="location.name">
                            {{ location.name }}
                        </option>
                    </select>
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
    padding-bottom: 2rem;

}

.map {
    flex: 2;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
}
</style>
