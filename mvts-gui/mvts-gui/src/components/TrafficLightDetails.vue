<script setup lang="ts">
import type { TrafficLight } from '@/types/TrafficLight';

const props = defineProps<{
    trafficLight: TrafficLight
}>();
</script>

<template>
    <div class="container">
        <h3>{{ trafficLight.location }}</h3>
        <p>State: {{ trafficLight.state }}</p>
        <p>Mode: {{ trafficLight.mode }}</p>
        <p>Last Updated: {{ trafficLight.updatedAt }}</p>
    </div>
</template>

<style scoped>
.container {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
}

p {
    margin: 5px 0;
    font-size: 1rem;
}
</style>
