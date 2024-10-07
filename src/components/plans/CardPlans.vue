<script setup>
import ButtonGlobal from '../global/ButtonGlobal.vue';

    defineProps({
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
        }
    })
</script>
<template>
    <div class="card-plan">
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
        <ButtonGlobal title="Obter" btn_id="btn-plans"></ButtonGlobal>
    </div>
</template>