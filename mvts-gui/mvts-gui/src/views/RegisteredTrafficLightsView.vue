<script setup lang="ts">
import TrafficLightCard from '@/components/TrafficLightCard.vue';
import { useTrafficLightsStore } from '@/stores/trafficLights';
import { onMounted, onUnmounted } from 'vue';

const trafficLightsStore = useTrafficLightsStore();

onMounted(() => {
  trafficLightsStore.connectMqtt();
});

onUnmounted(() => {
});
</script>

<template>
  <div class="content">
    <h1>Registered Traffic Lights</h1>
    <div class="status-indicator" :class="trafficLightsStore.connectionStatus">
      Status: {{ trafficLightsStore.connectionStatus === 'connected' ? 'Connected' : 'Disconnected' }}
    </div>

    <div class="traffic-light-container">
      <TrafficLightCard 
        v-for="trafficLight in Object.values(trafficLightsStore.trafficLights)" 
        :key="trafficLight.id"
        :trafficLights="[trafficLight]" 
      />
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

.status-indicator {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-left: 2rem;
  display: inline-block;
  font-weight: bold;
}

.status-indicator.connected {
  background-color: #d4edda;
  color: #155724;
}

.status-indicator.disconnected {
  background-color: #f8d7da;
  color: #721c24;
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