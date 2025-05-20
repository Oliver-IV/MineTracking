<script setup lang="ts">
import type { TrafficLight } from '@/types/front/TrafficLight';
import IconTrafficLight from './icons/IconTrafficLight.vue';

const props = defineProps<{
    trafficLights: TrafficLight[]
}>()

const getTrafficLightColor = (state: string) => {
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

const emit = defineEmits<{
    (e: 'select', trafficLight: TrafficLight): void
}>();
</script>

<template>
    <div 
        v-for="trafficLight in props.trafficLights" 
        :key="trafficLight.id" 
        class="traffic-light-container"
        @click="emit('select', trafficLight)"
    >
        <div class="signal">
            <IconTrafficLight class="signal-icon" />
            <p>Traffic Light {{ trafficLight.id }}</p>
        </div>
        <div 
            class="traffic-light-color" 
            :style="{ backgroundColor: getTrafficLightColor(trafficLight.state) }"
        ></div>
    </div>
</template>

<style scoped>
.traffic-light-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
    width: 90%;
    margin-bottom: 10px;
    padding: 0.5rem 0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.traffic-light-container:hover {
    background-color: #f8f8f8;
}

.signal-icon {
    width: 40px;
    height: 30px;
    margin: 0;
}

.signal {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    gap: 1rem;
}

.traffic-light-color {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 1rem;
    border: 1px solid #e5e7eb;
}
</style>