<script setup lang="ts">
import { getAllCarts } from '@/client/CarsClient';
import IconSee from '../components/icons/IconSee.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';

import { testCart } from '@/mockData/Cart';
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';

// Define una interfaz para el tipo de carrito
interface Cart {
    id: string;
    name: string;
    type: string;
    capacity: string;
    state: string;
}

const router = useRouter();
const loaded = ref(false);
const carts = ref<Cart[]>([]);
const searchVehicle = ref('');
const searchState = ref('');
const loading = ref(true);

async function loadCarts() {
    try {
        loading.value = true;
        const loadedCarts = await getAllCarts();
        console.log(loadedCarts)
        carts.value = loadedCarts.map(cart => {
            return {
                id: cart.id,
                name: cart.name,
                type: cart.type.toLocaleString(),
                capacity: cart.capacity.value + ' ' + cart.capacity.measurementUnit,
                state: "NUEVO"
            }
        });
        loaded.value = true;
    } catch (error) {
        console.error("Error loading carts:", error);
    } finally {
        loading.value = false;
    }
}

const filteredCarts = computed(() => {
    return carts.value.filter(cart => {
        const matchesVehicle = searchVehicle.value === '' || 
                              cart.name.toLowerCase().includes(searchVehicle.value.toLowerCase());
        const matchesState = searchState.value === '' || 
                            cart.state.toLowerCase().includes(searchState.value.toLowerCase());
        return matchesVehicle && matchesState;
    });
});

function goToRegisterRoute() {
    router.push({ name: 'registerVehicle' });
}

onMounted(() => {
    loadCarts();
});
</script>

<template>
    <div class="container">
        <div class="header">
            <h1>Registered Vehicles</h1>
            <button class="register-button" @click="goToRegisterRoute">Register Vehicle</button>
        </div>

        <div class="filter-bar">
            <input class="filter-input" type="text" placeholder="Search Vehicle" v-model="searchVehicle" />
            <input class="filter-input" type="text" placeholder="State" v-model="searchState" />
        </div>

        <div class="name-bar">
            <p>ID</p>
            <p>Name</p>
            <p>Type</p>
            <p>Capacity</p>
            <p>State</p>
            <p>Actions</p>
        </div>

        <div v-if="loading" class="loading-container">
            <p>Loading vehicles...</p>
        </div>

        <div v-else-if="filteredCarts.length === 0" class="empty-container">
            <p>No vehicles found</p>
        </div>

        <template v-else>
            <div class="info-display" v-for="cart in filteredCarts" :key="cart.id">
                <p>{{ cart.id }}</p>
                <p>{{ cart.name }}</p>
                <p>{{ cart.type }}</p>
                <p>{{ cart.capacity }}</p>
                <p>{{ cart.state }}</p>
                <p class="action-icons">
                    <IconSee />
                    <IconEdit />
                    <IconTrash />
                </p>
            </div>
        </template>
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
    justify-content: space-around;
    align-items: center;
}

.action-icons {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.loading-container, .empty-container {
    display: flex;
    justify-content: center;
    padding: 2rem;
    font-size: 1.1rem;
    color: #6b7280;
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