<script setup lang="ts">
import IconSee from '../components/icons/IconSee.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import { DELETEdeleteRoute, GETfindAllRoutes } from '@/client/RoutesClient'; // Asumo que crearás este cliente
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { RouteDto } from '@/types/back/routeDto/route.dto';

const router = useRouter();
const loaded = ref(false);
const routes = ref<RouteDto[]>([]);
const searchDeparture = ref('');
const searchDestination = ref('');
const loading = ref(true);

async function loadRoutes() {
    try {
        loading.value = true;
        const loadedRoutes = await GETfindAllRoutes();
        console.log(loadedRoutes);
        routes.value = loadedRoutes ;
        loaded.value = true;
    } catch (error) {
        console.error("Error loading routes:", error);
    } finally {
        loading.value = false;
    }
}

const filteredRoutes = computed(() => {
    return routes.value.filter(route => {
        const matchesDeparture = searchDeparture.value === '' || 
                               route.start.name.toLowerCase().includes(searchDeparture.value.toLowerCase());
        const matchesDestination = searchDestination.value === '' || 
                                 route.end.name.toLowerCase().includes(searchDestination.value.toLowerCase());
        return matchesDeparture && matchesDestination;
    });
});

function goToRegisterRoute() {
    router.push({ name: 'registerRoute' });
}

function viewRouteDetails(routeId: string) {
    router.push({ name: 'routeDetails', params: { id: routeId } });
}

function editRoute(routeId: string) {
    router.push({ name: 'editRoute', params: { id: routeId } });
}

async function deleteRoute(routeId: string) {
    if (confirm('Are you sure you want to delete this route?')) {
        try {
            await DELETEdeleteRoute(routeId);
            routes.value = routes.value.filter(route => route.routeId !== routeId);
        } catch (error) {
            console.error("Error deleting route:", error);
        }
    }
}

onMounted(() => {
    loadRoutes();
});
</script>

<template>
    <div class="container">
        <div class="header">
            <h1>Registered Routes</h1>
            <button class="register-button" @click="goToRegisterRoute">Register Route</button>
        </div>

        <div class="filter-bar">
            <input class="filter-input" type="text" placeholder="Search Departure" v-model="searchDeparture" />
            <input class="filter-input" type="text" placeholder="Search Destination" v-model="searchDestination" />
        </div>

        <div class="name-bar">
            <p>ID</p>
            <p>Departure Point</p>
            <p>Destination</p>
            <p>Actions</p>
        </div>

        <div v-if="loading" class="loading-container">
            <p>Loading routes...</p>
        </div>

        <div v-else-if="filteredRoutes.length === 0" class="empty-container">
            <p>No routes found</p>
        </div>

        <template v-else>
            <div class="info-display" v-for="route in filteredRoutes" :key="route.routeId">
                <p>{{ route.routeId }}</p>
                <p>{{ route.start.name }}</p>
                <p>{{ route.end.name }}</p>
                <p class="action-icons">
                    <IconSee @click="viewRouteDetails(route.routeId)" class="clickable-icon" />
                    <IconEdit @click="editRoute(route.routeId)" class="clickable-icon" />
                    <IconTrash @click="deleteRoute(route.routeId)" class="clickable-icon" />
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
