<script setup lang="ts">
import type { TrafficLight } from '@/types/TrafficLight';

const props = defineProps<{
    trafficLights: TrafficLight[];
}>();
</script>

<template>
    <div class="traffic-light-card" v-for="trafficLight in props.trafficLights" :key="trafficLight.id">
        <h2>Traffic Light</h2>
        <p>State: {{ trafficLight.state }} </p>
        <p>Mode: {{ trafficLight.mode }}</p>
        <p>Last Updated: {{ trafficLight.updatedAt }}</p>
    </div>
</template>

<style scoped>
.traffic-light-card {
    border: solid 1px #d1d5db;
    border-radius: 25px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    min-width: 250px;
    box-sizing: border-box;
}
</style>
