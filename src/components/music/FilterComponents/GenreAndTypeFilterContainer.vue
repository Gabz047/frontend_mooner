<script setup>
import { ref, shallowRef } from 'vue';

const props = defineProps({
    data: {
        type: Array
    },
    genre: {
        type: String
    }
})

const typeOfData = ref([
    {title: 'Músicas', selected: false}, {title: 'Playlists', selected: false}, {title: 'Álbuns', selected: false}, {title: 'Artistas', selected: false}
])
const selected = ref(typeOfData.value[0].title)
const select = (index) => {
    typeOfData.value.forEach(element => {
        element.selected = false
        selected.value = null
    });
    typeOfData.value[index].selected = true
    console.log(typeOfData.value)
    selected.value = typeOfData.value[index].title
    emits('action', selected.value)
}   

const emits = defineEmits([
    'action'
])

const openOptions = shallowRef(false)
</script>
<template>
    <div class="w-full flex gap-4">
        <p class="pl-12 text-xl text-white font-medium">Selecione Categorias</p>
        <div @click="openOptions = !openOptions" class="relative flex items-center cursor-pointer select-none ">
        <div :class="openOptions ? '' : 'overflow-hidden'" class="text-white bg-[#282828] font-light text-base rounded-3xl py-1 px-2  flex flex-col h-8 w-32 z-30">
            <p>{{ props.genre }}</p>
            
        </div>
        <div :class="openOptions ? 'mt-2 bg-[#282828] absolute w-32 h-auto animation' : 'h-8'" class="flex flex-col gap-3 duration-200 top-2 z-20 left-0 rounded-b-xl pt-5">
            <span v-if="openOptions" @click="select(index)" class="w-full flex justify-center duration-200 rounded-lg hover:bg-[#4d4d4d28] text-white appear" v-for="(type,index) in typeOfData" :key="index" > {{ type.title }} </span>
            </div>
        <span :class="!openOptions ? 'rotate-0' : 'rotate-180'" class="mdi mdi-chevron-down absolute duration-200 z-30 right-1 text-xl text-white"></span>
    </div>
    </div>
</template>

<style scoped>
.animation {
 animation: dropDown 0.3s 1;

}

.appear {
    animation: appear 0.2s 1;
}

@keyframes appear {
    0% {
        opacity: 0;
        height: 0px;
    }
    50% {
        opacity: 0.5;
        height: 12.2px;
    }
    100% {
        opacity: 1;
        height: 22.5px;
    }
}

@keyframes dropDown {
    from {
        height: 0px;
        opacity: 0;
    }
    to {
        height: 146px;
        opacity: 1;
    }
}
</style>