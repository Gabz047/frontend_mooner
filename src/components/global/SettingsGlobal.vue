<script setup>
import { data, verify_active } from '@/utils/music/music';
import { onMounted, ref } from 'vue';
const props = defineProps({
    is_on: {
        type: Boolean,
        default: false
    },
    history: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    'addQueue'
])

const added = ref(false)

const addQueue = () => {
    added.value = true
    setTimeout(()=>{
        added.value = false
        emits('addQueue')
    },1000)
    
}

</script>
<template>
<div v-if="props.is_on" class="w-52 bg-[rgb(49,49,49)] p-2 rounded-xl absolute z-30 top-16 right-0">

 <!-- <div @click="(item.tittle == 'Adicionar a Fila') ? $emit('addQueue') : item.liked = !item.liked" v-for="item, index in data" :key="index" class="w-full flex h-10 justify-between items-center cursor-pointer rounded-md p-1 hover:bg-[#3a3a3a]">
    <p class=" text-base text-white">{{ item.tittle }}</p>
 <div @click="item.liked = !item.liked, item.history === history ? $emit('deletesong') : null" v-for="item, index in data" :key="index" class="w-full flex h-10 justify-between items-center cursor-pointer rounded-md p-1 hover:bg-[#3a3a3a]">
    <p class=" text-base text-white" v-if="item.history === history && item.tittle === 'Remover'">{{item.tittle}}</p>
    <p v-else class=" text-base text-white">{{item.tittle}}</p>
    <img :src="item.tittle != 'Curtir' ? item.img : !item.liked ? item.img[0] : item.img[1]" class="w-6 h-6">
 </div>
 </div> -->

<div @click="(item.tittle == 'Adicionar a Fila') ? addQueue() : item.liked = !item.liked, item.history === history ? $emit('deletesong') : null" v-for="item, index in data" :key="index" class="relative w-full flex h-10 justify-between items-center cursor-pointer rounded-md p-1 hover:bg-[#3a3a3a]">
    <div v-if="item.tittle == 'Adicionar a Fila' && added" class="w-full h-full bg-[rgb(49,49,49)] absolute flex justify-center items-center gap-2 select-none">
        <p class="text-[#AA5AF5]">Adicionado</p>
        <span class="mdi mdi-check-decagram text-[#AA5AF5]"></span>
    </div>
    <p class=" text-base text-white" v-if="item.history === history && item.tittle === 'Remover'">{{item.tittle}}</p>
    <p v-else class=" text-base text-white">{{item.tittle}}</p>
    <img :src="item.tittle != 'Curtir' ? item.img : !item.liked ? item.img[0] : item.img[1]" class="w-6 h-6">
</div>
  
</div>
</template>