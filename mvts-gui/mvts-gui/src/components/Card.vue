<template>
    <div class="card">
        <p class="title">{{ title }}</p>
        <p class="value">{{ value }}</p>
        <p class="change">{{ change }}</p>
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
    border: 1px solid #D1D5DB;
    border-radius: 16px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30%;
    height: 100px;
    box-sizing: border-box;
    overflow: hidden;
}

.title,
.value,
.change {
    margin: 0;
    overflow: hidden;

}
</style>
