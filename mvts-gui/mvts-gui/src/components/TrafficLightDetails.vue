<script setup lang="ts">
import type { TrafficLight } from '@/types/TrafficLight';
import { ref, defineEmits } from 'vue';

const props = defineProps<{
    trafficLight: TrafficLight
}>();

const actualColor = ref(props.trafficLight.state);
const emit = defineEmits(['color-selected']);
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

const selectColor = (color: string) => {
    emit('color-selected', color);
};
</script>

<template>
    <div class="container">
        <h3>{{ trafficLight.location }}</h3>
        <div class="change-state">
            <p>State: {{ trafficLight.state }}</p>
            <div class="traffic-light-color" :style="{ backgroundColor: getTrafficLightColor(trafficLight.state) }">
            </div>
        </div>
        <p>Mode: {{ trafficLight.mode }}</p>
        <p>Last Updated: {{ trafficLight.updatedAt }}</p>
        <div class="change-state">
            <div class="green" @click="selectColor('green')"></div>
            <div class="yellow" @click="selectColor('yellow')"></div>
            <div class="red" @click="selectColor('red')"></div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 20px;


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

.change-state {
    display: flex;
    align-items: center;

}

.green {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #22C55E;
    margin-right: 10px;
    margin-left: 10px;
}

.yellow {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #F59E0B;
    margin-right: 10px;
}

.red {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #EF4444;
}

.traffic-light-color {

    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    margin-left: 10px;
}
</style>
