<script setup>
import router from '@/router';
import ButtonGlobal from '../global/ButtonGlobal.vue';
import { usePaymentStore } from '@/stores';
const paymentstore = usePaymentStore()
const props = defineProps({
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        type_service: {
            type: String,
            required: true
        },
        advantages: {
            type: Array,
            required: true
        },
        notice:{
            type: String,
            required: true
        },
        action_btn: {
            type: Function,
            required: true
        },
        gradient:{
            type: String,
            required: true
        }
    })
    function gotopaymentPage(){
        paymentstore.getAssign(props.title)
        router.push('/plans/payments')
    }
</script>
<template>
    <div class="card-plan" :style="{background: gradient}">
        <p v-if="notice" id="notice">{{notice}}</p>
        <div class="plans-description">
            <h1>{{title}}</h1>
        <div>
            <p>${{price}}</p>
            <span>por {{type_service == 'mensal' ? 'mês' : 'ano'}}</span>
        </div>
        </div>
        <hr>
        <div class="plans-advantage">
            <ul>
                <li v-for="advantage in advantages">{{advantage}}</li>
            </ul>
        </div>
        <ButtonGlobal title="Obter" font_size="17.5px" border="none" background="white" width="250px" border_radius="20px" color="blueviolet" @click="gotopaymentPage"></ButtonGlobal>
    </div>
</template>