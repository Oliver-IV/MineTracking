<script setup lang="ts">
// components
import RecentAlertCard from '@/components/RecentCongestionAlertCard.vue';
import Card from '@/components/Card.vue';
import RecentDeliveryCard from '@/components/RecentDeliveryCard.vue';
// mock data
import { testCongestions } from '@/mockData/Congestion';
import { testCart } from '@/mockData/Cart';
// vue
import { ref } from 'vue';

const congestions = testCongestions
const carts = testCart


const visibleCongestions = ref(3);
const visibleCarts = ref(3);


const showAllCongestions = ref(false);
const showAllCarts = ref(false);
const toggleCongestions = () => {
    showAllCongestions.value = !showAllCongestions.value;
};

const toggleCarts = () => {
    showAllCarts.value = !showAllCarts.value;
};
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
            <div class="header">
                <h2>Recent Congestions</h2>
                <p>Register of the most recent congestions</p>
            </div>
            <div class="congestion-container">

                <RecentAlertCard
                    v-for="(congestion, index) in congestions.slice(0, showAllCongestions ? congestions.length : 3)"
                    :key="index" :congestions="[congestion]" />
            </div>

            <div class="history" @click="toggleCongestions">
                {{ showAllCongestions ? 'Show Less' : 'See History' }}
            </div>
        </div>

        <div class="container">
            <div class="header">
                <h2>Recent Deliveries</h2>
                <p>Register of the most recent deliveries</p>
            </div>
            <div class="congestion-container">

                <RecentDeliveryCard v-for="(cart, index) in carts.slice(0, showAllCarts ? carts.length : 3)"
                    :key="index" :carts="[cart]" />
            </div>
            <div class="history" @click="toggleCarts">
                {{ showAllCarts ? 'Show Less' : 'See History' }}
            </div>
        </div>

    </div>
</template>



<style scoped>
.alert-container {
    display: flex;
    justify-content: space-evenly;
    gap: 2rem;
    width: 90%;
    margin: auto;

}

.container {
    border: solid 1px #D1D5DB;
    width: 50%;
    border-radius: 20px;
}

.header {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    margin-top: 0;
    margin-bottom: 0;
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
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.history:hover {
    background-color: #f3f4f6;
}
</style>