<script setup lang="ts">
import IconSee from '../components/icons/IconSee.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';

import { testCart } from '@/mockData/Cart';

import { ref, computed } from 'vue';

const carts = testCart;

//filters fam
const searchVehicle = ref('');
const searchState = ref('');

const filteredCarts = computed(() => {
    return carts.filter(cart => {
        const matchesVehicle = searchVehicle.value === '' || cart.name.toLowerCase().includes(searchVehicle.value.toLowerCase());
        const matchesState = searchState.value === '' || cart.state.toLowerCase().includes(searchState.value.toLowerCase());
        return matchesVehicle && matchesState;
    });
});
</script>
<template>
    <div class="container">
        <div class="header">
            <h1>Registered Routes</h1>
            <button class="register-button">Register Route</button>
        </div>

        <div class="filter-bar">
            <input class="filter-input" type="text" placeholder="Search Vehicle" v-model="searchVehicle" />
            <input class="filter-input" type="text" placeholder="State" v-model="searchState" />
        </div>

        <div class="name-bar">
            <p>ID</p>
            <p>Vehicle on Cargo</p>
            <p>Transported Material</p>
            <p>Departure Point</p>
            <p>Destination</p>
            <p>Transit State</p>
            <p>Actions</p>
        </div>


        <div class="info-display" v-for="cart in filteredCarts" :key="cart.id">
            <p>{{ cart.id }}</p>
            <p>{{ cart.name }}</p>
            <p>{{ cart.material }}</p>
            <p>{{ cart.departure }}</p>
            <p>{{ cart.destination }}</p>
            <p>{{ cart.state }}</p>
            <p class="action-icons">
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

.filter-input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    margin-right: 1rem;
}


.name-bar {
    display: flex;
    justify-content: space-between;
    background-color: #D1D5DB;
    height: 40px;
    align-items: center;
    margin-bottom: 1rem;
}

.name-bar p {
    font-weight: bold;
    text-align: left;
    flex: 1 1 150px;
    margin: 0 5px;
}


.info-display {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
}

.info-display p {
    flex: 1 1 150px;
    text-align: left;
    margin: 0 5px;
}

.info-display p:last-child {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.action-icons {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
}


@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 0.5rem;
    }

    .name-bar,
    .info-display {
        flex-direction: column;
    }

    .filter-bar {
        flex-direction: column;
        gap: 10px;
    }
}
</style>
