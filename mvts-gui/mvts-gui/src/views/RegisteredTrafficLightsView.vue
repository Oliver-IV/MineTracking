<script setup lang="ts">
import TrafficLightCard from '@/components/TrafficLightCard.vue';
import { testTrafficLights } from '@/mockData/TrafficLight';
import type { TrafficLight } from '@/types/front/TrafficLight';

import { ref, onMounted } from 'vue';
// const trafficLights = testTrafficLights;

const apiUrl = '';

const trafficLights = ref<TrafficLight[]>([]);
onMounted(async () => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching traffic lights: ${response.statusText}`);
        }
        const data: TrafficLight[] = await response.json();
        trafficLights.value = data;
    } catch (error) {
        console.error('Failed to fetch traffic lights:', error);
    }
});



</script>

<template>
    <div class="content">
        <h1>Registered Traffic Lights</h1>

        <div class="traffic-light-container">
            <TrafficLightCard v-for="trafficLight in trafficLights" :key="trafficLight.id"
                :trafficLights="[trafficLight]" />
        </div>
    </div>
</template>

<style scoped>
.content {
    width: 90%;
    margin: 1% auto;
}

h1 {
    margin: 0 0 2rem 0;
    padding-left: 2rem;
    font-size: 2rem;
}

.traffic-light-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 0;
}

@media (max-width: 768px) {
    .traffic-light-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .traffic-light-container {
        grid-template-columns: 1fr;
    }
}
</style>
