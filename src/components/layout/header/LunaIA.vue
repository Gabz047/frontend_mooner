<script setup>
import { useLoginStore, useUserStore } from '@/stores';
import { useLunnaIAStore } from '@/stores';
import {  onMounted, onUnmounted, onUpdated, ref} from 'vue';
import LunnaChatContainer from './LunnaChatContainer.vue';
import LuunaApresentation from './LuunaApresentation.vue';
const storeLunna = useLunnaIAStore()
const storeUser = useLoginStore()
const userStore = useUserStore()
const pagina = ref(1)
const firstmsg = ref(false)
const interval = ref('')

async function Answer(answer){
    await storeLunna.CreateAnswer({usuario: userStore.myuser.email, answer: answer}, storeUser.state.access)
    firstmsg.value = true
} 

async function GetAutoResponses(answer){
    await storeLunna.CreateAnswer({usuario: userStore.myuser.email, answer: answer}, storeUser.state.access)
    firstmsg.value = true
}

async function getPagination(token, command){
    if(command === 'next'){
        pagina.value++
        await storeLunna.GetChat(token, pagina.value)
    }
    else {
        pagina.value--
        await storeLunna.GetChat(token, pagina.value)
    }
}

const getRepsonse = () => {
    const token = storeUser.state.access
    interval.value =  setInterval( async () => {
        await storeLunna.GetChat(userStore.myuser.email, token, pagina.value)
    }, 2000)
}

onMounted( async () =>{
    const token = storeUser.state.access
    await storeLunna.GetChat(userStore.myuser.email, token, pagina.value)
    getRepsonse()
})

onUnmounted(() => {
    clearInterval(interval.value)
})
</script>
<template>
    <div class="flex flex-col max-h-[150dvh] w-screen" >
        <div class="pagination" :style="storeLunna.state.chat.next && !storeLunna.state.chat.previous  ? {justifyContent: 'end'} : {justifyContent: 'space-between'}">
            <p @click="getPagination(storeUser.state.access, 'previous')" v-if="storeLunna.state.chat.previous" id="prev">anterior</p>
            <p @click="getPagination(storeUser.state.access, 'next')" v-if="storeLunna.state.chat.next" id="next">proximo</p>
        </div>
        <LuunaApresentation @autoresponse="GetAutoResponses" v-if="!firstmsg"/>
        <LunnaChatContainer @getanswer="Answer" :FirstMsg="firstmsg"/>
    </div>
</template>