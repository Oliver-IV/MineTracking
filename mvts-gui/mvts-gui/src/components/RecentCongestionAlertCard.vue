<script setup lang="ts">
import IconAlert from './icons/IconAlert.vue';
import type { Congestion } from '@/types/Congestion';
import type { Cart } from "@/types/Cart";

const props = defineProps<{
    congestions: Congestion[]
}>();

</script>

<template>
    <div class="congestion-container" v-for="congestion in props.congestions">
        <div class="congestion">
            <div class="left">
                <div class="alert-icon">
                    <IconAlert />
                </div>
                <div class="alert-description">
                    <p class="sector">Sector {{ congestion.sector }}</p>
                    <p class="date">{{ congestion.time }}</p>
                    <p class="cause">Cause: {{ congestion.cause }}</p>
                </div>
            </div>
            <div class="right">
                <div class="alert-time-car">
                    <div class="pill">{{ congestion.duration }} min</div>
                    <div class="pill">{{ congestion.cause }} vehículos</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.congestion-container {
    display: flex;
    padding: 1rem;
    border-radius: 10px;
    border: solid 1px #D1D5DB;
    width: 90%;

}

.congestion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.alert-icon {
    display: flex;
    color: #f9a825;
    font-size: 1.2rem;

}

.alert-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sector {
    font-weight: bold;

    margin-bottom: 0.2rem;
}

.date,
.cause {
    color: #717171;
    font-size: 0.85rem;
    margin-bottom: 0.1rem;
}

.right {
    display: flex;
    align-items: center;
    margin: auto;
}

.alert-time-car {
    display: flex;
    gap: 0.5rem;

}

.pill {
    background-color: #e0e0e0;
    color: #333;
    padding: 0.5rem 0.8rem;
    border-radius: 15px;
    font-size: 0.9rem;
}
</style>