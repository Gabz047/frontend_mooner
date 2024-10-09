<script setup>
import ButtonGlobal from '../global/ButtonGlobal.vue';
    defineProps({
        type:{
            type: String,
            required: true
        }
    })
</script>
<template>
    <div v-if="type === 'pix'">
        <h1>pix</h1>
        <img src="https://th.bing.com/th/id/OIP.U1S5NpMGxCdvgw4EJcMuegHaHa?rs=1&pid=ImgDetMain"/>
    </div>
    <div v-else-if="type === 'cartao'">
        <h1>Cartão de Crédito</h1>
        <div class="credit-card-container">
            <div>

            </div>
            <div>

            </div>
        </div>
    </div>
    <div v-else>
        <h1>Boleto</h1>
        <ButtonGlobal title="Gerar Boleto"></ButtonGlobal>
    </div>
</template>