<script setup>
import CardPlans from '@/components/plans/CardPlans.vue';
import { ref } from 'vue';
import { plans } from '@/utils/plans/plans';
import { useLoginStore } from '@/stores/user/login';
const changevisibility = ref(false)
const store = useLoginStore()
</script>
<template>
    <div class='container-plans-delete'>
    <div class="title-plans">
        <h1 >Planos Premium</h1>
        <p >Aproveite o maximo que temos a oferecer</p>
    </div>
        <div class="plans-visibility">
            <span @click="changevisibility = false" :style="!changevisibility ? {backgroundColor: 'white', color: 'black'} : {color: 'white'}">Mensal</span>
            <span @click="changevisibility = true" :style="changevisibility ? {backgroundColor: 'white', color: 'black'} : {color: 'white'}">Anual</span>
        </div>
        <div class="plans-card-container">
            <CardPlans v-for="info in plans.filter(el => el.type === 'mensal')" :title="info.name" :advantages="info.advantages" :price="info.price" :notice="info.notice" :type_service="info.type" :gradient="info.gradient" v-if="!changevisibility"/>
            <CardPlans v-for="info in plans.filter(el => el.type === 'anual')" :title="info.name" :advantages="info.advantages" :price="info.price" :notice="info.notice"  :type_service="info.type" :gradient="info.gradient" v-else/>   
        </div>
        <img src="../assets/images/moon.png">
    </div>
</template>