<script setup>
    import { feelings } from '@/utils/luuna/luuna';
    import { useLoginStore } from '@/stores';

    const LoginStore = useLoginStore()
    const emit = defineEmits(['autoresponse'])

    function sendAutoMsg(feel){
        const msg = `qual a vibe para quem está ${feel} hoje?`
        console.log(msg)
        emit('autoresponse', msg)
    }
</script>
<template>
    <div class="flex flex-col justify-center  items-center gap-1 text-white">
        <img src="../../../assets/images/luuna.png" width="150">
        <h1 class="text-xl font-bold">Olá {{ LoginStore.user.email }}, me chamo Luuna</h1>
        <h1 class="text-xl font-bold">Em que posso te ajudar ?</h1>
        <div class="flex flex-wrap gap-5 mt-16 w-96 justify-center p-5">
            <div v-for="feel, index in feelings" :key="index" :style="{border: `1px solid ${feel.color}`, color: feel.color }" class="p-1 rounded-full w-24 text-center" @click="sendAutoMsg(feel.title)">
                <p>{{feel.title}}</p>
            </div>
        </div>
    </div>
</template>