<script setup>
import { onMounted } from 'vue';
import { renderPaymentBrick } from '@/utils/payments/cardrender';
import { useLoginStore, usePaymentStore } from '@/stores';
import MsgGlobal from '@/components/global/MsgGlobal.vue';
import router from '@/router';
const mp = new MercadoPago('APP_USR-6f0a2fe0-d6e2-43fc-81b5-c71c7eee52de', {
    locale: 'pt'
});
  const bricksBuilder = mp.bricks({ theme: 'dark' });
  const paymentStore = usePaymentStore()
  const Loginstore = useLoginStore()

function userPremium(){
    Loginstore.state.access = ''
    Loginstore.state.user.email = ''
    Loginstore.state.user.password = ''
    Loginstore.state.refresh = ''
    router.push('/login')
}

onMounted(async () =>{
    const price = paymentStore.typeAssign.assign.price
    const name_product = paymentStore.typeAssign.assign.name

    await renderPaymentBrick(bricksBuilder, price, Loginstore.access, name_product);
})
</script>
<template>
    <div class="w-full flex justify-center items-center p-[50.1px] h-auto ">
        <MsgGlobal v-show="paymentStore.msg" :msg="paymentStore.msg" :err="paymentStore.err" @confirm="userPremium"/>
        <div id="paymentBrick_container" ></div>
    </div>
</template>
<style>
    #paymentBrick_container{
        width: 30%;
        border-radius: 20px;
    }
</style>
