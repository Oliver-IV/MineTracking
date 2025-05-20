<script setup lang="ts">
import type { LocationMessageDto } from '@/types/dto/LocationMessageDto';
import IconMineCart from './icons/IconMineCart.vue';

const props = defineProps<{
    carts: LocationMessageDto[]
}>()

const emit = defineEmits<{
    (e: 'select', cart: LocationMessageDto): void
}>();

const getStatusClass = (status: string) => {
    return status.toLowerCase() === 'moving' ? 'moving' : 'stopped';
};
</script>

<template>
    <div 
        v-for="cart in props.carts" 
        :key="cart.carId" 
        class="container" 
        @click="emit('select', cart)"
    >
        <div class="cart">
            <IconMineCart class="mine-cart-icon"/>
            <p>{{ cart.car?.name || `Vehicle ${cart.carId}` }}</p>
        </div>
        <div class="action">
            <p class="cart-action" :class="getStatusClass(cart.status)">{{ cart.status }}</p>
        </div>
    </div>
</template>

<style scoped>
.container {
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

.container:hover {
    background-color: #f8f8f8;
}

.cart {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    gap: 1rem;
}

.mine-cart-icon {
    width: 30px;
    height: 30px;
}

.action {
    padding: 0 1rem;
}

.cart-action {
    padding: 3px 10px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 0.85rem;
}

.cart-action.moving {
    background-color: #d1fae5;
    color: #065f46;
}

.cart-action.stopped {
    background-color: #fee2e2;
    color: #b91c1c;
}
</style>