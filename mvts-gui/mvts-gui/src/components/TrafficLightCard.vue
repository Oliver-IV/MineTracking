<script setup lang="ts">

import type { TrafficLight } from '@/types/TrafficLight';

const props = defineProps<{
    trafficLights: TrafficLight[]
}>()

</script>

<template>
    <div class="traffic-light-card" v-for="trafficLight in props.trafficLights" :key="trafficLight.id">
        <h2>Traffic Lights</h2>
        <p>State: {{ trafficLight.state }} </p>
        <p>Mode: {{ trafficLight.mode }}</p>
        <p>Last Updated: {{ trafficLight.updatedAt }}</p>

    </div>
</template>

<style>
.traffic-light-card {
    border: solid 1px #D1D5DB;
    border-radius: 25px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1 1 30%;
    min-width: 250px;
    box-sizing: border-box;

}
</style>