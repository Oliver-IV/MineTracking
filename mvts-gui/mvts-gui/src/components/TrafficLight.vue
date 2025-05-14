<script setup lang="ts">
import type { TrafficLight } from '@/types/TrafficLight';

const props = defineProps<{
    trafficLights: TrafficLight[]
}>()
</script>

<template>

    <div v-for="trafficLight in props.trafficLights" :key="trafficLight.id" class="traffic-light-container">
        <div class="signal">
            <img src="../assets/trafficLight.png" alt="signal icon" class="signal-icon">
            <p>Traffic Light {{ trafficLight.id }}</p>
        </div>
        <div class="traffic-light-color"></div>
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