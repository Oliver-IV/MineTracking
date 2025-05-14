<script setup lang="ts">

import TrafficLightCard from '@/components/TrafficLightCard.vue';
import { testTrafficLights } from '@/mockData/TrafficLight';

const trafficLights = testTrafficLights
</script>

<template>
    <h1>
        Registered Traffic Lights
    </h1>

    <div class="traffic-light-container">

        <TrafficLightCard :trafficLights="trafficLights"></TrafficLightCard>
    </div>

</template>


<style scoped>
.traffic-light-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
}
</style>