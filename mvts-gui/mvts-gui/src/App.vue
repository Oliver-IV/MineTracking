<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

const routes = [
  {
    path: '/maps',
    textName: "Real Time Maps",
  },
  {
    path: "/history",
    textName: "Operational History",
  },
  {
    path: "/reports",
    textName: "Managment Reports",
  },
  {
    path: "/assets",
    textName: "Asset Control",
  }
]
</script>

<template>

  <div class="header">
    <h3>MVTS - Mugiwara View Traffic System</h3>
    <p class="user">Operator - Monkey D. Luffy</p>
  </div>
  <hr class="line">
  <div>
    <Navbar class="navbar" :routes="routes" />
    <br>
    <RouterView />
  </div>
</template>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  padding-bottom: 0%;

}


.line {
  border: none;
  border-top: 2px solid #ccc;
  padding-top: 0%;
  margin-top: 0;

}


.user {
  color: gray;
}
</style>
