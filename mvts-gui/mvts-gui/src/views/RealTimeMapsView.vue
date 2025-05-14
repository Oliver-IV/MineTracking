<script setup lang="ts">
// vue
import { ref } from 'vue';
//components
import CongestionAlert from '@/components/CongestionAlert.vue';
import InTransitVehicle from '@/components/InTransitVehicle.vue';
import CartDetails from '@/components/CartDetails.vue';
import TrafficLight from '@/components/TrafficLight.vue';
// mock data
import { testCongestions } from '@/mockData/Congestion';
import { testCart } from '@/mockData/Cart';
import { testTrafficLights } from '@/mockData/TrafficLight';
// types
import type { Cart } from '@/types/Cart';


const congestions = testCongestions;
const carts = testCart
const trafficLights = testTrafficLights
const selectedCart = ref<Cart | null>(null);
</script>

<template>
    <div class="main-layout">
        <div class="map-container">
            <div class="map-view">
                <img src="../assets/location.png" alt="pin image" class="map-icon">
                <div class="text-group">
                    <h2>Map View</h2>
                    <p>Real time monitoring of maps and traffic lights</p>
                </div>
            </div>
        </div>
        <template class="information-container">
            <h2>Information</h2>
            <p>Vehicle information and alerts</p>
            <br />
            <template v-if="!selectedCart">
                <h3>Active Congestions</h3>
                <CongestionAlert :congestions="congestions" />
                <h3>Vehicles in Transit</h3>
                <InTransitVehicle :carts="carts" @select="selectedCart = $event" />
                <TrafficLight :trafficLights="trafficLights" />
            </template>

            <template v-else>
                <CartDetails :cart="selectedCart" />
                <p @click="selectedCart = null" id="close-details">Close Details</p>
            </template>


        </template>

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

.information-container {
    flex: 1;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    padding: 10px 50px 10px 50px;
}
</style>