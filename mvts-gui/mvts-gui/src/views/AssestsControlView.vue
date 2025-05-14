<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';


const routes = [
    {
        path: '/assets/routes',
        textName: 'Registered Routes',
    },
    {
        path: '/assets/vehicles',
        textName: 'Registered Vehicles',
    },
    {
        path: '/assets/trafficLights',
        textName: 'Traffic Lights',
    },
    {
        path: '/assets/address',
        textName: 'Registered Addresses',
    }
]
</script>

<template>
    <div class="navbar">
        <Navbar :routes="routes"></Navbar>
        <!-- <RouterLink v-for="link in links" :key="link.to" :to="link.to">
            {{ link.label }}
        </RouterLink> -->
    </div>
    <RouterView></RouterView>
</template>

<style scoped></style>
