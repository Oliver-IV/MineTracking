<script setup lang="ts">
import type { Cart } from '@/types/Cart';

const props = defineProps<{
    cart: Cart
}>();
</script>

<template>
    <div class="container">
        <h3>{{ cart.name }}</h3>
        <p>Material: {{ cart.material }}</p>
        <p>Quantity: {{ cart.quantity }}</p>
        <p>Departure: {{ cart.departure }}</p>
        <p>Destination: {{ cart.destination }}</p>
        <p>Departure Time: {{ cart.departureTime }}</p>
        <p>Arrivale Time: {{ cart.arrivalTime }}</p>
    </div>
</template>

<style scoped></style>
