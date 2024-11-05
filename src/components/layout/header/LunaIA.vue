<script setup>
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import { useLoginStore } from '@/stores';
import { useLunnaIAStore } from '@/stores';
import { onMounted, onUpdated, ref} from 'vue';
import LunaChat from './LunaChat.vue';
const useranswer = ref('')
const storeLunna = useLunnaIAStore()
const storeUser = useLoginStore()
const pagina = ref(1)
const chat = ref(null)
const counter = ref(0)

async function Answer(){
    counter.value = 0
    await storeLunna.CreateAnswer({usuario: storeUser.user.email, answer: useranswer.value}, storeUser.state.access)
    useranswer.value = ''
} 

const scrolltoEnd = () =>{
    if(chat.value){
        chat.value.scrollTop = chat.value.scrollHeight
    }
}

async function getPagination(token, command){
    if(command === 'next'){
        pagina.value++
        counter.value = 0
        await storeLunna.GetChat(token, pagina.value)
    }
    else {
        pagina.value--
        counter.value = 0
        await storeLunna.GetChat(token, pagina.value)
    }
}

onUpdated(async() =>{
    const token = storeUser.state.access
    await storeLunna.GetChat(storeUser.user.email, token, pagina.value)
    counter.value++
    if(counter.value <= 50){
        scrolltoEnd()
    }   
})

onMounted( async () =>{
    const token = storeUser.state.access
    await storeLunna.GetChat(storeUser.user.email, token, pagina.value)
    scrolltoEnd()
})
</script>
<template>
    <div class="lunna-container">
        <div class="pagination" :style="storeLunna.state.chat.next && !storeLunna.state.chat.previous  ? {justifyContent: 'end'} : {justifyContent: 'space-between'}">
            <p @click="getPagination(storeUser.state.access, 'previous')" v-if="storeLunna.state.chat.previous" id="prev">anterior</p>
            <p @click="getPagination(storeUser.state.access, 'next')" v-if="storeLunna.state.chat.next" id="next">proximo</p>
        </div>
        <div class="luuna-desc">
            <img src="../../../assets/images/luuna.png">
            <h1>Ola eu sou Lunna</h1>
        </div>
        <div class="flex flex-col gap-5">
            <div class="chat-container" ref="chat">
                <LunaChat v-for="chat in storeLunna.chatorder" :key="chat.id" :answer="chat.answer" :response="chat.response"/>
            </div>
            <div class="lunna-chat">
                <InputGlobal placeholder="ola" id="luuna-input" v-model:value="useranswer"/>
                <ButtonGlobal class="flex justify-center items-center"width="50px" height="40px" background="#6340AE" border="none" border_radius="10px"  :is_arrow="true" @click="Answer"/>
            </div>
        </div>
    </div>
</template>