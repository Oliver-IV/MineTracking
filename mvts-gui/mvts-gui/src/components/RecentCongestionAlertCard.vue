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
    /* Color naranja del icono de alerta */
    font-size: 1.2rem;
    /* Ajusta el tamaño del icono si es necesario */
}

.alert-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sector {
    font-weight: bold;
    /* El nombre del sector en negrita */
    margin-bottom: 0.2rem;
}

.date,
.cause {
    color: #717171;
    /* Color de texto secundario */
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
    /* Espacio entre los "pills" */
}

.pill {
    background-color: #e0e0e0;
    /* Fondo gris claro para los pills */
    color: #333;
    /* Color del texto en los pills */
    padding: 0.5rem 0.8rem;
    border-radius: 15px;
    /* Bordes redondeados para los pills */
    font-size: 0.9rem;
}
</style>