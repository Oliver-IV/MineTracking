<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useVehiclesStore } from '@/stores/vehicles';
import { useTrafficLightsStore } from '@/stores/trafficLights';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CongestionAlert from '@/components/CongestionAlert.vue';
import InTransitVehicle from '@/components/InTransitVehicle.vue';
import CartDetails from '@/components/CartDetails.vue';
import TrafficLightPill from '@/components/TrafficLightPill.vue';
import TrafficLightDetails from '@/components/TrafficLightDetails.vue';
import IconLocation from '@/components/icons/IconLocation.vue';
import { testCongestions } from '@/mockData/Congestion';
import { testCart } from '@/mockData/Cart';
import { testTrafficLights } from '@/mockData/TrafficLight';
import type { Cart } from '@/types/front/Cart';
import type { TrafficLight } from '@/types/front/TrafficLight';

const congestions = testCongestions;
const carts = testCart;
const trafficLights = testTrafficLights;
const selectedCart = ref<Cart | null>(null);
const selectedTrafficLight = ref<TrafficLight | null>(null);

const vehiclesStore = useVehiclesStore();
const trafficLightsStore = useTrafficLightsStore();

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;
const carMarkers = ref<Record<string, L.Marker>>({});
const trafficLightMarkers = ref<Record<string, L.Marker>>({});
const carRoutes = ref<Record<string, L.Polyline>>({});

const carIcon = L.icon({
  iconUrl: 'https://cdn2.iconfinder.com/data/icons/funtime-mechanics/60/001_013_railroad_wagon_train_vehicle_delivery_logistics_cargo-512.png', // Icono de carrito
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const redLightIcon = L.icon({
  iconUrl: 'https://cdn4.iconfinder.com/data/icons/traffic-lights-1/340/traffic-light-circulation-pedestrian-car_08-512.png', // Semáforo rojo
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const yellowLightIcon = L.icon({
  iconUrl: 'https://cdn4.iconfinder.com/data/icons/traffic-lights-1/336/traffic-light-circulation-pedestrian-car_11-512.png', // Semáforo amarillo
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const greenLightIcon = L.icon({
  iconUrl: 'https://cdn4.iconfinder.com/data/icons/traffic-lights-1/341/traffic-light-circulation-pedestrian-car_13-512.png', // Semáforo verde
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const newColor = ref<string>('');

onMounted(() => {
  vehiclesStore.connectMqtt();
  trafficLightsStore.connectMqtt();
  initMap();
});

onUnmounted(() => {
  vehiclesStore.disconnectMqtt();
  trafficLightsStore.disconnectMqtt();
  if (map) {
    map.remove();
    map = null;
  }
});

function initMap() {
  if (!mapContainer.value) return;
  
  map = L.map(mapContainer.value).setView([25.564878, -108.4578342], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  watch(() => vehiclesStore.vehicles, (newVehicles) => {
    updateVehiclesOnMap(newVehicles);
  }, { deep: true });

  watch(() => trafficLightsStore.trafficLights, (newTrafficLights) => {
    updateTrafficLightsOnMap(newTrafficLights);
  }, { deep: true });
}

function updateVehiclesOnMap(vehicles: Record<string, any>) {
  if (!map) return;

  Object.entries(vehicles).forEach(([vehicleId, vehicleData]) => {
    const latLng = L.latLng(vehicleData.location.latitude, vehicleData.location.longitude);

    if (!carMarkers.value[vehicleId]) {
      carMarkers.value[vehicleId] = L.marker(latLng, {
        icon: carIcon,
        title: `Vehículo ${vehicleId}`
      }).addTo(map!);

      carRoutes.value[vehicleId] = L.polyline([], { 
        color: '#3b82f6',
        weight: 3,
        opacity: 0.7
      }).addTo(map!);
    } else {
      carMarkers.value[vehicleId].setLatLng(latLng);
    }

    carRoutes.value[vehicleId].addLatLng(latLng);

    carMarkers.value[vehicleId].bindPopup(`
      <b>Vehículo ${vehicleId}</b><br>
      <img src="https://cdn-icons-png.flaticon.com/512/744/744465.png" width="24"/><br>
      Nombre: ${vehicleData.car?.name || 'N/A'}<br>
      Estado: ${vehicleData.status}<br>
      Velocidad: ${vehicleData.speed || 'N/A'} km/h<br>
      Material: ${vehicleData.car?.shipment?.material || 'N/A'}<br>
      Cantidad: ${vehicleData.car?.shipment?.quantity || 'N/A'}<br>
      Última actualización: ${new Date(vehicleData.timestamp).toLocaleTimeString()}
    `);
  });
}

function updateTrafficLightsOnMap(trafficLights: Record<string, any>) {
  if (!map) return;

  Object.entries(trafficLights).forEach(([tlId, tlData]) => {
    const latLng = L.latLng(tlData.location.latitude, tlData.location.longitude);
    const stateStr = tlData.state;
    const icon = getTrafficLightIcon(tlData.state);

    // Crear o actualizar marcador
    if (!trafficLightMarkers.value[tlId]) {
      trafficLightMarkers.value[tlId] = L.marker(latLng, {
        icon: icon,
        title: `Semáforo ${tlId}`
      }).addTo(map!);
    } else {
      trafficLightMarkers.value[tlId].setLatLng(latLng);
      trafficLightMarkers.value[tlId].setIcon(icon);
    }

    // Actualizar popup
    trafficLightMarkers.value[tlId].bindPopup(`
      <b>Semáforo ${tlId}</b><br>
      <img src="${getTrafficLightImageUrl(tlData.state)}" width="24"/><br>
      Estado: ${stateStr}<br>
      Activo: ${tlData.active ? 'Sí' : 'No'}<br>
      Intervalos: ${formatCycleIntervals(tlData.cycleIntervals)}<br>
      Última actualización: ${new Date(tlData.lastUpdate).toLocaleTimeString()}
    `);
  });
}

function getTrafficLightIcon(state: string): L.Icon {
  switch (state) {
    case 'RED': return redLightIcon;
    case 'YELLOW': return yellowLightIcon;
    case 'GREEN': return greenLightIcon;
    default: return redLightIcon;
  }
}

function getTrafficLightImageUrl(state: string): string {
  switch (state) {
    case 'RED': return 'https://cdn4.iconfinder.com/data/icons/traffic-lights-1/340/traffic-light-circulation-pedestrian-car_08-512.png';
    case 'YELLOW': return 'https://cdn4.iconfinder.com/data/icons/traffic-lights-1/336/traffic-light-circulation-pedestrian-car_11-512.png';
    case 'GREEN': return 'https://cdn4.iconfinder.com/data/icons/traffic-lights-1/341/traffic-light-circulation-pedestrian-car_13-512.png';
    default: return 'https://cdn2.iconfinder.com/data/icons/funtime-mechanics/60/001_013_railroad_wagon_train_vehicle_delivery_logistics_cargo-512.png';
  }
}

function formatCycleIntervals(intervals: any): string {
  if (!intervals) return 'N/A';
  return `R:${intervals.red / 1000}s / Y:${intervals.yellow / 1000}s / G:${intervals.green / 1000}s`;
}

const changeTrafficLightColor = async () => {
  if (!selectedTrafficLight.value) return;

  try {
    const response = await fetch('cambiar color apa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trafficLightId: selectedTrafficLight.value.id,
        newColor: newColor.value,
      }),
    });

    const data = await response.json();
    selectedTrafficLight.value.state = newColor.value;
    console.log('Color changed', data);
  } catch (error) {
    console.error('Error changing traffic light color', error);
  }
};
</script>

<template>
  <div class="main-layout">
    <div class="map-container">
      <div class="map-view">
        <IconLocation class="map-icon" />
        <div class="text-group">
          <h2>Map View</h2>
          <p>Real time monitoring of maps and traffic lights</p>
        </div>
      </div>
      <div ref="mapContainer" class="map"></div>
      <div class="status-container">
        <div class="status-indicator" :class="vehiclesStore.connectionStatus">
          Vehicles: {{ vehiclesStore.connectionStatus === 'connected' ? 'Connected' : 'Disconnected' }}
        </div>
        <div class="status-indicator" :class="trafficLightsStore.connectionStatus">
          Traffic Lights: {{ trafficLightsStore.connectionStatus === 'connected' ? 'Connected' : 'Disconnected' }}
        </div>
      </div>
    </div>

    <!-- Contenedor adicional para los "information containers" -->
    <div class="information-wrapper">
      <div class="information-container">
        <h2>Information</h2>
        <p>Vehicle information and alerts</p>
        <br />
        <template v-if="!selectedCart">
          <h3>Active Congestions</h3>
          <CongestionAlert :congestions="congestions" />
          <h3>Vehicles in Transit</h3>
          <InTransitVehicle 
            :carts="Object.values(vehiclesStore.vehicles)" 
            @select="selectedCart = $event" 
          />
        </template>

        <template v-else>
          <CartDetails :cart="selectedCart" />
          <p @click="selectedCart = null" id="close-details">Close Details</p>
        </template>
      </div>

      <div class="information-container">
        <h2>Traffic Lights</h2>
        <p>Traffic lights status and control</p>
        <br />
        <template v-if="!selectedTrafficLight">
          <TrafficLightPill 
            :trafficLights="Object.values(trafficLightsStore.trafficLights)" 
            @select="selectedTrafficLight = $event" 
          />
        </template>
        <template v-else>
          <TrafficLightDetails :trafficLight="selectedTrafficLight" />
          <div class="color-control">
            <label>Change Color:</label>
            <select v-model="newColor">
              <option value="RED">Red</option>
              <option value="YELLOW">Yellow</option>
              <option value="GREEN">Green</option>
            </select>
            <button @click="changeTrafficLightColor">Change</button>
          </div>
          <p @click="selectedTrafficLight = null" id="close-details">Close Details</p>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  gap: 1rem;
  height: calc(100vh - 2rem);
  padding: 1rem;
}

.map-container {
  flex: 2;
  padding: 1rem;
  border: solid 1px #D1D5DB;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background: white;
}

.map {
  flex: 1;
  height: 0; /* Para que ocupe todo el espacio disponible */
  min-height: 400px;
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
  z-index: 1;
}

.information-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-width: 350px;
}

.information-container {
  flex: 1;
  border: solid 1px #D1D5DB;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
  background: white;
}

.map-view {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.map-icon {
  width: 50px;
  height: 50px;
}

.text-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
}

p {
  margin: 0;
  color: #6B7280;
  font-size: 0.9rem;
}

#close-details {
  color: white;
  background-color: #3b82f6;
  border-radius: 15px;
  padding: 10px 50px;
  cursor: pointer;
  margin-top: auto;
  align-self: center;
  text-align: center;
  transition: background-color 0.2s;
}

#close-details:hover {
  background-color: #2563eb;
}

.status-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.status-indicator {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.85rem;
}

.status-indicator.connected {
  background-color: #d4edda;
  color: #155724;
}

.status-indicator.disconnected {
  background-color: #f8d7da;
  color: #721c24;
}

.color-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  width: 100%;
}

.color-control label {
  font-weight: bold;
}

.color-control select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #D1D5DB;
  flex-grow: 1;
}

.color-control button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.color-control button:hover {
  background-color: #2563eb;
}

@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
    height: auto;
  }
  
  .map-container {
    min-height: 500px;
  }
  
  .information-wrapper {
    flex-direction: row;
  }
}

@media (max-width: 768px) {
  .information-wrapper {
    flex-direction: column;
  }
}
</style>