<script setup lang="ts">

import RecentAlertCard from '@/components/RecentCongestionAlertCard.vue';
import Card from '@/components/Card.vue';
import RecentDeliveryCard from '@/components/RecentDeliveryCard.vue';

import { testCongestions } from '@/mockData/Congestion';
import { testCart } from '@/mockData/Cart';

const congestions = testCongestions
const carts = testCart
</script>

<template>
    <h1>Panel Control</h1>

    <div class="card-container">
        <Card title="Congestiones" :value="777" change="+10 desde ayer" />
        <Card title="Congestiones" :value="777" change="+10 desde ayer" />
        <Card title="Congestiones" :value="777" change="+10 desde ayer" />
    </div>
    <br>
    <div class="alert-container">
        <div class="container">
            <h2>Recent Congestions</h2>
            <p>Register of the most recent congestions</p>
            <div class="congestion-container">
                <RecentAlertCard :congestions="congestions"></RecentAlertCard>
            </div>
            <div class="history">See History</div>
        </div>

        <div class="container">
            <h2>Recent Congestions</h2>
            <p>Register of the most recent congestions</p>

            <div class="congestion-container">
                <RecentDeliveryCard :carts="carts"></RecentDeliveryCard>
            </div>
            <div class="history">See History</div>
        </div>

    </div>


</template>

<style scoped>
.alert-container {
    display: flex;
    justify-content: space-evenly;
    gap: 2rem;
    width: 90%;


}

.container {
    border: solid 1px #D1D5DB;
    width: 50%;
    border-radius: 20px;

}

.card-container {
    display: flex;
    justify-content: space-evenly;
}

.card {
    border: solid 1px #D1D5DB;
    border-radius: 25px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 30%;
}


.history {
    display: flex;
    justify-content: center;
    border: solid 1px #D1D5DB;
    border-radius: 20px;
    padding: 10px;
    width: 80%;
    margin: auto;
    margin-top: 1%;
    margin-bottom: 2%;
}
</style>