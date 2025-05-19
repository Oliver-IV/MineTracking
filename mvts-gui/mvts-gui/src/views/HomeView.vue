
<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import IconProfile from '../components/icons/IconProfile.vue'
import { ref } from 'vue'


const routes = [
    { path: '/maps', textName: "Real Time Maps" },
    { path: "/history", textName: "Operational History" },
    { path: "/reports", textName: "Managment Reports" },
    { path: "/assets", textName: "Asset Control" }
]
const showMenu = ref(false)
function toggleMenu() {
    showMenu.value = !showMenu.value
}

function logout() {
    console.log('Logging out...')
}

</script>

<template>
    <div>
        <div class="header">
            <h3>MVTS - Mugiwara View Traffic System</h3>
            <div class="profile">
                <p class="user">Operator - Monkey D. Luffy</p>
                <div class="profile-icon-wrapper" @click="toggleMenu">
                    <IconProfile class="profile-icon" />
                    <div v-if="showMenu" class="dropdown">
                        <button @click="logout">Logout</button>

                    </div>
                </div>
            </div>
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

.profile {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>
