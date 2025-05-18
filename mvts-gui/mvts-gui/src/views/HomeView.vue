<!-- src/layouts/MainLayout.vue -->
<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'

const routes = [
    { path: '/maps', textName: "Real Time Maps" },
    { path: "/history", textName: "Operational History" },
    { path: "/reports", textName: "Managment Reports" },
    { path: "/assets", textName: "Asset Control" }
]
</script>

<template>
    <div>
        <div class="header">
            <h3>MVTS - Mugiwara View Traffic System</h3>
            <p class="user">Operator - Monkey D. Luffy</p>
        </div>
        <hr class="line" />
        <Navbar :routes="routes" />
        <RouterView />
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
}

.line {
    border-top: 2px solid #ccc;
}

.user {
    color: gray;
}
</style>
