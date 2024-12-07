<script setup>
import { shallowRef, computed } from 'vue';
import { useSongStore } from '@/stores';
import { SearchOptions, MobileSearchOptions } from '@/components';
const songStore = useSongStore()
const search = shallowRef('Pesquise por uma música')
const focused = shallowRef(null)
const props = defineProps({
    open: {
        type: Boolean
    },
    openForProps: {
        type: Boolean
    }
})


const focusComp = computed(() => {
    focused.value.focus()
    if (typeof focused.value.focus === 'function') {
        search.value = ''
    }
})

const isSearch = computed(() => {
    if (search.value != 'Pesquise por uma música' && search.value != '') {
        return songStore.songsByTitle
    } else {
        return songStore.songsByLast
    }
})

const searchByName = (search) => {
    songStore.getSongsByName(search)  
} 

const addSearch = (song) => {
    console.log(song)
    songStore.createLastSongs(song)
}

const emits = defineEmits([
    'close'
])



</script>
<template>
    <div :class="props.openForProps ? 'desanimate' : 'animation'" class=" w-screen h-[100dvh] absolute top-[-16px] justify-center right-0 lg:flex z-[9999] hidden">
    <div @click="emits('close')" class="text-white absolute z-[9999999] flex gap-2 left-5 top-3">
    <span class="mdi mdi-arrow-left"></span>
    <p>Voltar</p>
    </div>
    <div class="flex top-[70px] w-[300px] justify-center absolute z-[999999] ">
      <div class="h-[33px] w-[284px] flex items-center relative bg-[#151515] rounded-2xl ">
            <input @keyup="searchByName(search)" :class="search == 'Pesquise por uma música' ? 'text-[#373737]' : 'text-white'" ref="focused" class="h-full w-[80%] outline-none bg-transparent p-2 relative" type="text" v-model="search" @click="focusComp" @blur="search == '' ? search = 'Pesquise por uma música' : '', focused = null" >
            <span class="mdi mdi-magnify lg:ml-7 duration-500 lg:relative absolute right-3 text-xl lg:text-2xl text-white lg:hover:bg-[#151515] px-3 py-2 rounded-full"></span>
           
        </div>
        
        </div>
        <MobileSearchOptions @addToSearch="addSearch" :data="isSearch" />
    </div>
    <div class="absolute w-screen bg-[rgba(0,0,0,0.7)] backdrop-blur-sm z-[999] top-[-16px] right-0 h-[100dvh]"></div>
</template>
<style scooped>
.animation {
    animation: animation 0.5s 1;
}

.desanimate {
    animation: desanimate 0.5s 1;
}
@keyframes desanimate {
    from {
        top: -16px;
    } to {
        top: -800px;
    }
}

@keyframes animation {
    from {
        top: -300px;
    } to {
        top: -16px;
    }
}
</style>