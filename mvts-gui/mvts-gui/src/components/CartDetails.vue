<script setup lang="ts">
import type { LocationMessageDto } from '@/types/dto/LocationMessageDto';
import IconMineCart from './icons/IconMineCart.vue';

const props = defineProps<{
    cart: LocationMessageDto
}>();
</script>

<template>
    <div class="container">
        <div class="header">
            <IconMineCart class="mine-cart-icon"/>
            <h3>{{ cart.car?.name || `Vehicle ${cart.carId}` }}</h3>
        </div>
        
        <div class="detail-section">
            <h4>Status</h4>
            <p :class="cart.status.toLowerCase()">{{ cart.status }}</p>
        </div>
        
        <div class="detail-section" v-if="cart.car?.shipment">
            <h4>Shipment</h4>
            <p>Material: {{ cart.car.shipment.material }}</p>
            <p>Quantity: {{ cart.car.shipment.quantity }}</p>
        </div>
        
        <div class="detail-section">
            <h4>Location</h4>
            <p>Latitude: {{ cart.location.latitude.toFixed(6) }}</p>
            <p>Longitude: {{ cart.location.longitude.toFixed(6) }}</p>
        </div>
        
        <div class="detail-section">
            <h4>Speed</h4>
            <p>{{ cart.speed || 'N/A' }} km/h</p>
        </div>
        
        <div class="detail-section">
            <h4>Last Update</h4>
            <p>{{ new Date(cart.timestamp).toLocaleString() }}</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    padding: 1rem;
}

.header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.mine-cart-icon {
    width: 40px;
    height: 40px;
}

h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #1f2937;
}

h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #1f2937;
}

.detail-section {
    background-color: #f8f8f8;
    padding: 1rem;
    border-radius: 8px;
}

p {
    margin: 0.25rem 0;
    color: #4b5563;
}

.moving {
    color: #065f46;
    font-weight: bold;
}

.stopped {
    color: #b91c1c;
    font-weight: bold;
}
</style>