<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
    router.back();
}
</script>
<template>
    <div class="main-layout">
        <div class="container">
            <div class="header">
                <h1>Register New Vehicle</h1>
                <div class="button-container">
                    <button @click="goBack" class="back-button">Back</button>
                    <button class="register-button">Register</button>
                </div>
            </div>

            <div class="car-inforamtion">
                <h2>Vehicle Details</h2>
                <input type="text" placeholder="Name">
                <input type="text" placeholder="Capacity">
                <input type="number" placeholder="Type">
                <input type="text" placeholder="State">
                <textarea name="description" id="" placeholder="Additiaonal Notes"></textarea>
            </div>
        </div>
    </div>


</template>

<style scoped>
.main-layout {
    border-radius: 20px;
    border: solid 1px #D1D5DB;
    margin-top: 2rem;
}


.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.back-button {
    background-color: #FFFFFF;
    border-radius: 20px;
    height: 40px;
    padding: 0 40px;
    border: solid 1px #D1D5DB;
}

.register-button {
    border-radius: 25px;
    border: none;
    background-color: #3b82f6;
    color: #fff;
    height: 40px;
    padding: 0 40px;
    border: solid 1px #D1D5DB;
}

.car-inforamtion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem;
    max-width: 20%;
}
</style>