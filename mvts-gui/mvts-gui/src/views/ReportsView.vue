<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';

const routes = [
    {
        path: "/reports/materials",
        textName: "Materials",

    },
    {
        path: "/reports/congestions",
        textName: "Congestions",
    }

]

</script>

<template>
    <div class="navbar">
        <Navbar :routes="routes" :key="routes" />

        <RouterView />
    </div>


</template>

<style scoped>
.navbar {
    align-items: center;
}
</style>