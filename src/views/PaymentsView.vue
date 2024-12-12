<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { renderPaymentBrick } from '@/utils/payments/cardrender';
import { useLoginStore, usePaymentStore } from '@/stores';
import MsgGlobal from '@/components/global/MsgGlobal.vue';
import router from '@/router';

const mp = new MercadoPago("APP_USR-6f0a2fe0-d6e2-43fc-81b5-c71c7eee52de", {
    locale: 'pt'
});

const bricksBuilder = mp.bricks({ theme: 'dark' });
const paymentStore = usePaymentStore();
const Loginstore = useLoginStore();
const ProductId = ref(null)
const QrCode = ref(null)
const QRcodeText = ref(null)

const Options = ref([
    {
        title: 'OUTROS MÉTODOS',
        active: true
    },
    {
        title: 'QR CODE',
        active: false
    }
])

function ChangeMethod(index){
    Options.value.forEach((option, idx) =>{
        option.active = idx === index
    })
}

function userPremium() {
    Loginstore.state.access = '';
    Loginstore.state.user.email = '';
    Loginstore.state.user.password = '';
    Loginstore.state.refresh = '';
    router.push('/login');
}

const status = ref(null)

const getBackendResponses = (name) => {
    status.value = setInterval(async () => {
        await paymentStore.getStatus(ProductId.value, name, Loginstore.user.email)
    }, 2000)
}

onMounted(async () => {
    const price = paymentStore.typeAssign.assign.price;
    const name_product = paymentStore?.typeAssign?.assign?.name;
    await renderPaymentBrick(bricksBuilder, price, Loginstore.access, name_product);
    const response = await paymentStore.GetQrCode(Loginstore.access)
    QrCode.value = response.qr_code_base64
    QRcodeText.value = response.qr_code
    ProductId.value = response.id
    getBackendResponses(name_product)
    console.log(response)
});

onUnmounted(() => {
    clearInterval(status.value)
})
</script>
<template>
    <div>
        <div>
            <div class="absolute flex justify-center items-center z-10 w-2/4  top-0 -left-20 bottom-0">
                <img src="../assets/images/Paymentcompleted.png" class="w-full absolute z-0" alt="">
                <div class="w-full h-full z-10 relative" style="background-color: rgba(0, 0, 0, .9);"></div>
            </div>
            <div class="absolute w-full flex justify-center flex-col gap-10 z-20 p-5 items-center h-auto ">
                <div class="w-full flex flex-col jusitfy-center items-center">
                    <h1 class="text-white text-3xl font-bold">PREPARADO PARA UMA EXPERIÊNCIA</h1>
                    <h1 class="text-purple-800 font-bold text-5xl">PREMIUM?</h1>
                </div>
                <div class="w-full flex justify-center gap-5 items-center">
                    <div v-for="option, index in Options" :key="index" class="border p-1 w-48 rounded-xl" :class="option.active ? 'bg-purple-800 border-none' : null" @click="ChangeMethod(index)">
                        <p class="text-center text-white">{{option.title}}</p>
                    </div>
                </div>
                <div class="w-full flex justify-center items-center" v-show="Options[0].active">
                    <KeepAlive>
                        <div class="w-[30%]">
                            <div id="paymentBrick_container"></div>
                        </div>
                    </KeepAlive>
                </div>
                <div class="flex flex-col justify-center items-center w-1/4 gap-5" v-show="Options[1].active">
                    <img :src="`data:image/png;base64,${QrCode}`" width="250">
                </div>
            </div>
        </div> 
    </div>
    <MsgGlobal v-show="paymentStore.msg" :msg="paymentStore.msg" :err="paymentStore.err" @confirm="userPremium" />
</template>