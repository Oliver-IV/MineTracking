<script setup lang="ts">
import type { Cart } from '@/types/Cart';
import IconMineCart from './icons/IconMineCart.vue';
const props = defineProps<{
    carts: Cart[]
}>()
const emit = defineEmits<{
    (e: 'select', cart: Cart): void
}>();


</script>

<template>
    <div v-for="cart in props.carts" :key="cart.id" class="container" @click="emit('select', cart)">
        <div class="cart">
            <IconMineCart class="mine-cart-icon"/>
            <p>{{ cart.name }}</p>
        </div>
        <div class="action">
            <p class="cart-action">{{ cart.state }}</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
    width: 90%;
    margin-bottom: 10px;
}

.cart {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    gap: 1rem
}

#cart-icon {
    width: 20px;
    height: 20px;
    margin: 0;
}

.action {
    padding: 0 1rem;
}

#cart-action {
    color: white;
    background-color: black;
    padding: 3px 10px;
    border-radius: 10px;

}

.mine-cart-icon{
    width: 30px;
    height: 30px;
}
</style>