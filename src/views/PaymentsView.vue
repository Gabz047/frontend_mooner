<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { renderPaymentBrick } from '@/utils/payments/cardrender';
import { useLoginStore, usePaymentStore } from '@/stores';
import MsgGlobal from '@/components/global/MsgGlobal.vue';
import router from '@/router';
import InputGlobal from '@/components/global/InputGlobal.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
const mp = new MercadoPago("APP_USR-6f0a2fe0-d6e2-43fc-81b5-c71c7eee52de", {
    locale: 'pt'
});
const bricksBuilder = mp.bricks({ theme: 'dark' });
const paymentStore = usePaymentStore();
const Loginstore = useLoginStore();
const ProductId = ref(null)
const QrCode = ref(null)
const QRcodeText = ref(null)

function userPremium(){
    Loginstore.state.access = '';
    Loginstore.state.user.email = '';
    Loginstore.state.user.password = '';
    Loginstore.state.refresh = '';
    router.push('/login');
}

const status = ref(null)

const getBackendResponses = (name) => {
    status.value = setInterval( async () =>{
        const status = await paymentStore.getStatus(ProductId.value, name, Loginstore.user.email)
        console.log(status)
    }, 2000)
}

onMounted(async () => {
    const price = paymentStore.typeAssign.assign.price;
    const name_product = paymentStore.typeAssign.assign.name.split('  ').join(' ');
    await renderPaymentBrick(bricksBuilder, price, Loginstore.access, name_product);
    const response = await paymentStore.GetQrCode(Loginstore.access)
    QrCode.value = response.qr_code_base64
    QRcodeText.value = response.qr_code
    ProductId.value = response.id
    getBackendResponses(name_product)
});

onUnmounted(() =>{
    clearInterval(status.value)
})
</script>
<template>
    <div class="w-full flex justify-center gap-52 items-center p-[50.1px] h-auto">
        <MsgGlobal v-show="paymentStore.msg" :msg="paymentStore.msg" :err="paymentStore.err" @confirm="userPremium"/>
        <div id="paymentBrick_container"></div>
        <h1 class="text-white text-xl">OU</h1>
        <div class="flex flex-col justify-center items-center w-1/4 gap-5">
            <img :src="`data:image/png;base64,${QrCode}`" width="250">
            <InputGlobal v-model:value="QRcodeText" id="luuna-input"/>
            <ButtonGlobal title="Copiar" color="white" background="purple" border_radius="20px" width="100px"/>
        </div>
    </div>
</template>