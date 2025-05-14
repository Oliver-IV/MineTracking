<script setup lang="ts">
import type { Congestion } from '@/types/Congestion';
const props = defineProps<{
    congestions: Congestion[]
}>()

</script>

<template>
    <div class="container" v-for="congestion in props.congestions" v-if="props.congestions.length > 0">
        <div class="alert-header">
            <p>Sedctor {{ congestion.sector }}</p>
            <p id="time">{{ congestion.time.split(' ')[1] }}</p>
        </div>
        <div class="alert-info">
            <p> Severity: {{ congestion.severity }}</p>
            <p>Vehicle: {{ congestion.vehicle }}</p>
        </div>
    </div>
    <div v-else>
        <p>No Active Congestions</p>
    </div>

</template>

<style scoped>
.container {
    background-color: #FEF2F2;
    border-radius: 20px;
    padding: 5px 10px 5px 10px;
    border: solid 1px #D1D5DB;
    width: 90%;
    box-sizing: border-box;
    margin-bottom: 20px;

}

.alert-header {
    display: flex;
    justify-content: space-between;


}

.alert-info {
    color: #6B7280;
    margin-bottom: 20px;

}

#time {
    background-color: white;
    margin-left: 5px;
    padding: 2px;
    border-radius: 5px;
    border: solid 1px #D1D5DB;
}

p {
    margin: 5px;
}
</style>