<script setup lang="ts">
import type { TrafficLight } from '@/types/front/TrafficLight';


const props = defineProps<{
    trafficLights: TrafficLight[];
}>();

const getTrafficLightColor = (state: String) => {
    switch (state) {
        case 'GREEN':
            return '#22C55E';
        case 'YELLOW':
            return '#F59E0B';
        case 'RED':
            return '#EF4444';
        default:
            return '#D1D5DB';
    }
};
</script>

<template>
    <div class="traffic-light-card" v-for="trafficLight in props.trafficLights" :key="trafficLight.id">
        <div class="header">
            <h2>Traffic Light</h2>
            <div class="traffic-light-color" :style="{ backgroundColor: getTrafficLightColor(trafficLight.state) }">
            </div>
        </div>
        <p>State: {{ trafficLight.state }} </p>
        <p>Last Updated: {{ trafficLight.lastUpdate }}</p>
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

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}

.traffic-light-color {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 1rem;
}
</style>
