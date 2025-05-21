<script setup lang="ts">
import { ref } from 'vue';
import { POSTgeneratePDF } from "@/client/ReportsClient";


const reportTime = ref('1');


async function generateReport() {
    const reportDetails = {
        reportType: 1,
        dateType: parseInt(reportTime.value),
    };

    try {
        await POSTgeneratePDF(reportDetails);
    } catch (error) {
        console.error("Error generating report:", error);
    }
}
</script>

<template>
    <h1>Delivered Material</h1>

    <div class="create-report">
        <p>Report of</p>
        <select name="date" id="report-time" v-model="reportTime">
            <option value="1">Today</option>
            <option value="2">Last 7 days</option>
            <option value="3">Last 28 days</option>
        </select>
        <button @click="generateReport">Generate Report</button>
    </div>
</template>

<style scoped>
.create-report {
    display: flex;
    align-items: center;
    width: 90%;
    margin: auto;
    gap: 1rem;
}
</style>
