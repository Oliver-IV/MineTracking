<script setup lang="ts">
import IconSee from '../components/icons/IconSee.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';

import { testCart } from '@/mockData/Cart';

const carts = testCart;
</script>

<template>
    <div class="container">
        <div class="header">
            <h1>Registered Vehicles</h1>
            <button class="register-button">Register Vehicle</button>
        </div>

        <div class="filter-bar">
            <input type="text" placeholder="Search Vehicle" />
            <input type="text" placeholder="State" />
        </div>

        <div class="name-bar">
            <p>ID</p>
            <p>Name</p>
            <p>Type</p>
            <p>Capacity</p>
            <p>State</p>
            <p>Actions</p>
        </div>

        <div class="info-display" v-for="cart in carts" :key="cart.id">
            <p>{{ cart.id }}</p>
            <p>{{ cart.name }}</p>
            <p>{{ cart.type }}</p>
            <p>{{ cart.capacity }}</p>
            <p>{{ cart.state }}</p>
            <p>
                <IconSee />
                <IconEdit />
                <IconTrash />
            </p>
        </div>
    </div>
</template>

<style scoped>
.container {
    border: solid 1px #d1d5db;
    border-radius: 20px;
    width: 95%;
    margin: 0 auto;
    padding: 1rem;
    margin-top: 2%;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.register-button {
    border-radius: 25px;
    border: none;
    background-color: #3b82f6;
    color: #fff;
    width: 200px;
    height: 40px;
    padding: 0 15px;
}

.filter-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.name-bar,
.info-display {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.name-bar p,
.info-display p {
    flex: 1 1 150px;
    text-align: left;
    margin: 0 5px;
}

.name-bar p {
    font-weight: bold;
}

.info-display p {
    text-align: left;
}

.info-display p:last-child {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
