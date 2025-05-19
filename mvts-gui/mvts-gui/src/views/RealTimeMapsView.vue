<script setup lang="ts">
// vue
import { ref } from 'vue';
//components
import CongestionAlert from '@/components/CongestionAlert.vue';
import InTransitVehicle from '@/components/InTransitVehicle.vue';
import CartDetails from '@/components/CartDetails.vue';
import TrafficLightPill from '@/components/TrafficLightPill.vue';
// mock data
import { testCongestions } from '@/mockData/Congestion';
import { testCart } from '@/mockData/Cart';
import { testTrafficLights } from '@/mockData/TrafficLight';
// types
import type { Cart } from '@/types/front/Cart';
import type { TrafficLight } from '@/types/front/TrafficLight';
import TrafficLightDetails from '@/components/TrafficLightDetails.vue';
import IconLocation from '@/components/icons/IconLocation.vue';

const congestions = testCongestions;
const carts = testCart;
const trafficLights = testTrafficLights;
const selectedCart = ref<Cart | null>(null);
const selectedTrafficLight = ref<TrafficLight | null>(null);

const newColor = ref<string>('');
const changeTrafficLightColor = async () => {
    if (!selectedTrafficLight.value) return;

    try {
        const response = await fetch('cambiar color apa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trafficLightId: selectedTrafficLight.value.id,
                newColor: newColor.value,
            }),
        });

        const data = await response.json();
        selectedTrafficLight.value.state = newColor.value;
        console.log('Color changed', data);
    } catch (error) {
        console.error('Error changing traffic light color', error);
    }
};
</script>

<template>
    <div class="main-layout">
        <div class="map-container">
            <div class="map-view">
                <IconLocation class="map-icon" />
                <div class="text-group">
                    <h2>Map View</h2>
                    <p>Real time monitoring of maps and traffic lights</p>
                </div>
            </div>
        </div>

        <!-- Contenedor adicional para los "information containers" -->
        <div class="information-wrapper">
            <div class="information-container">
                <h2>Information</h2>
                <p>Vehicle information and alerts</p>
                <br />
                <template v-if="!selectedCart">
                    <h3>Active Congestions</h3>
                    <CongestionAlert :congestions="congestions" />
                    <h3>Vehicles in Transit</h3>
                    <InTransitVehicle :carts="carts" @select="selectedCart = $event" />

                </template>

                <template v-else>
                    <CartDetails :cart="selectedCart" />
                    <p @click="selectedCart = null" id="close-details">Close Details</p>
                </template>

            </div>

            <div class="information-container">
                <h2>Information</h2>
                <p>Vehicle information and alerts</p>
                <br />
                <template v-if="!selectedTrafficLight">
                    <TrafficLightPill :trafficLights="trafficLights" @select="selectedTrafficLight = $event" />
                </template>
                <template v-if="selectedTrafficLight">
                    <TrafficLightDetails :trafficLight="selectedTrafficLight" />
                    <button @click="changeTrafficLightColor">Change Traffic Light</button>
                    <p @click="selectedTrafficLight = null" id="close-details">Close Details</p>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-layout {
    display: flex;
    gap: 1rem;
}

.map-container {
    flex: 2;
    padding: 1rem;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
}

.information-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
}

.information-container {
    flex: 1;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.map-view {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.map-icon {
    width: 50px;
    height: 50px;
}

.text-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

h2 {
    margin: 0;
}

p {
    margin: 0;
    color: #6B7280;
}

#close-details {
    color: black;
    border: solid 1px black;
    border-radius: 15px;
    padding: 10px 50px;
    cursor: pointer;
}
</style>
