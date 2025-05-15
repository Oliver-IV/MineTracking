<script setup lang="ts">
import IconAlert from './icons/IconAlert.vue';
import type { Cart } from "@/types/Cart";
import IconMineCart from './icons/IconMineCart.vue';

const props = defineProps<{
    carts: Cart[]
}>();


</script>

<template>
    <div class="cart-container" v-for="cart in props.carts">
        <div class="cart">
            <div class="left">
                <div class="alert-icon">
                    <IconMineCart class="mine-cart-icon" />
                </div>
                <div class="alert-description">
                    <p class="sector">Sector {{ cart.name }}</p>
                    <p class="date">{{ cart.name }}</p>
                    <p class="cause">Cause: {{ cart.name }}</p>
                </div>
            </div>
            <div class="right">
                <div class="alert-time-car">
                    <div class="pill">{{ cart.name }} min</div>
                    <div class="pill">{{ cart.name }} vehículos</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-container {
    display: flex;
    padding: 1rem;
    border-radius: 10px;
    border: solid 1px #D1D5DB;
    width: 90%;

}

.cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.alert-icon {
    display: flex;

}

.alert-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sector {
    font-weight: bold;

    margin-bottom: 0.2rem;
}

.date,
.cause {
    color: #717171;
    font-size: 0.85rem;
    margin-bottom: 0.1rem;
}

.right {
    display: flex;
    align-items: center;
    margin: auto;
}

.alert-time-car {
    display: flex;
    gap: 0.5rem;

}

.pill {
    background-color: #e0e0e0;
    color: #333;
    padding: 0.5rem 0.8rem;
    border-radius: 15px;
    font-size: 0.9rem;
}

.mine-cart-icon {
    width: 30px;
    height: 30px;
}
</style>