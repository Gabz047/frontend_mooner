<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import LunaChat from './LunaChat.vue';
import { useLunnaIAStore } from '@/stores';
const LunnaStore = useLunnaIAStore()
const useranswer = ref('')
const chatContainer = ref(null)

defineEmits(['autoresponse'])

const props = defineProps({
    FirstMsg: {
        type: Boolean,
        default: false
    },
})

const LuunaChat = computed(() => {
    return LunnaStore.chatorder
})

watch(
    () => LuunaChat.value,
    async (newV, oldV) => {
        if (newV[newV.length - 1].id > oldV[oldV.length - 1].id) {
            await nextTick();
            StartBottom();
        }
    },
    { deep: true }
);

async function StartBottom() {
    await nextTick()
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
}

watch(() => props.FirstMsg, (newVal) => {
    if (newVal) {
        StartBottom();
    }
});

onMounted(async () => {
    await nextTick();
    StartBottom();
})
</script>
<template>
    <div class="flex  flex-col justify-center items-center  gap-5">
        <div class=" max-h-[80dvh] justify-center w-11/12 overflow-y-auto  p-5 text-white" ref="chatContainer" v-if="FirstMsg">
            <LunaChat v-for="chat in LuunaChat" :key="chat.id" :answer="chat.answer" :response="chat.response"/>
        </div>
        <div class="lunna-chat" >
            <div class="bg-[#282828] rounded-full p-1 flex justify-center items-center">
                <InputGlobal placeholder="Fale com a luuna" id="luuna-input" v-model:value="useranswer"/>
                <ButtonGlobal class="flex justify-center items-center" width="40px" height="40px" background="#6340AE" border="none" border_radius="50px"  :is_arrow="true" @click="$emit('getanswer', useranswer), useranswer = ''"/>
            </div>
        </div>
    </div>
</template>