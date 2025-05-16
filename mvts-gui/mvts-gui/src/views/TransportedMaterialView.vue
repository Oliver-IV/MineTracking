<script setup lang="ts">
import Card from '@/components/Card.vue';
</script>

<template>
    <h1>
        Managment Reports
    </h1>

    <div class="card-container">
        <Card title="Congestiones" :value="777" change="+10 desde ayer" />
        <Card title="Congestiones" :value="777" change="+10 desde ayer" />
        <Card title="Congestiones" :value="777" change="+10 desde ayer" />
        <Card title="Congestiones" :value="777" change="+10 desde ayer" />
        <Card title="Congestiones" :value="777" change="+10 desde ayer" />
    </div>
</template>

<style scoped>
.card-container {
    display: flex;
    justify-content: space-evenly;
    gap: 2rem;
    width: 90%;
    margin: auto;
    align-items: center;

}


</style>