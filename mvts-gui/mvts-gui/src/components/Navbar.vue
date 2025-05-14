<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
interface Route {
    path: string
    textName: string
}
const props = defineProps<{
    routes: Route[]
}>()


</script>

<template>
    <div class="navbar">
        <div class="nav-text" v-for="route in props.routes" :key="route.textName">
            <RouterLink class="nav-link" :to="route.path">{{ route.textName }} </RouterLink>
            <!-- <button @click="goTo">AQUI WE</button> -->
            <!-- <a href="" @click="goTo">{{ route.name }}</a> -->
        </div>

    </div>
</template>

<style scoped>
.navbar {
    background-color: #D1D5DB;
    height: 40px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

}

a {
    text-decoration: none;
    color: #6B7280;
}

.nav-text {
    padding: 5px;
    margin: 0 10px;
    cursor: pointer;

}

.router-link-active {
    background-color: white;
    color: black;
    padding: 6px 60px;
    margin: 2px 0;
    border-radius: 4px;
    transition: all 0.2s ease;
}
</style>
