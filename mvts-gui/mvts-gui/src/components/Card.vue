
<template>
    <div class="card">
        <p>{{ title }}</p>
        <p>{{ value }}</p>
        <p>{{ change }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    value: Number,
    change: String,
});
</script>

<style scoped>
.card {
    border: solid 1px #D1D5DB;
    border-radius: 25px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 30%;
}
</style>
