<script setup lang="ts">
import type { TrafficLight } from '@/types/TrafficLight';

const props = defineProps<{
    trafficLights: TrafficLight[]
}>()

const getTrafficLightColor = (state: String) => {
    switch (state) {
        case 'green':
            return '#22C55E';
        case 'yellow':
            return '#F59E0B';
        case 'red':
            return '#EF4444';
        default:
            return '#D1D5DB';
    }
};

const emit = defineEmits<{
    (e: 'select', TrafficLight: TrafficLight): void
}>();


</script>

<template>

    <div v-for="trafficLight in props.trafficLights" :key="trafficLight.id" class="traffic-light-container" @click="emit('select', trafficLight)">
        <div class="signal">
            <img src="../assets/trafficLight.png" alt="signal icon" class="signal-icon">
            <p>Traffic Light {{ trafficLight.id }}</p>
        </div>
        <div class="traffic-light-color" :style="{ backgroundColor: getTrafficLightColor(trafficLight.state) }"></div>
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
    background-color: #22C55E;
    margin-right: 1rem;
}
</style>