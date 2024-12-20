<script setup>
import { shallowRef, computed, onMounted } from 'vue';
import { useSongStore } from '@/stores';
import { SearchOptions, MobileSearchForSearchOptions } from '@/components';
import router from '@/router';
const songStore = useSongStore()
const search = shallowRef('Pesquise por uma música')
const focused = shallowRef(null)
const focusComp = computed(() => {
    focused.value.focus()
    if (typeof focused.value.focus === 'function') {
        console.log('entro')
        search.value = ''
    }
})
const openForProps = shallowRef(false)
const getWidthScreen = shallowRef(window.screen.width)

onMounted(async()=>{
    await songStore.getSongs()
})

const open = shallowRef(false)

const isOnSearch = shallowRef(false)
const isSearch = computed(() => {
    if (search.value != 'Pesquise por uma música' && search.value != '') {
        isOnSearch.value = true
        return songStore.songsByTitle
    } else {
        isOnSearch.value = false
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
</script>
<template>
    <div @mouseenter="setOpen(true)" @mouseleave="setOpen(false)" class="flex justify-center relative">
      <div class="h-[33px] w-full flex items-center relative lg:bg-transparent lg:w-auto bg-[#151515] rounded-2xl z-50">
            <input @keyup="searchByName(search)" :class="search == 'Pesquise por uma música' ? 'text-[#373737]' : 'text-white'" ref="focused" class="h-full w-[80%] outline-none bg-transparent p-2 relative lg:hidden" type="text" v-model="search" @click="focusComp" @blur="search == '' ? search = 'Pesquise por uma música' : '', focused = null" >
            <span @click="getWidthScreen < 1024 ? router.push('/navigation') : ''" class="mdi mdi-magnify lg:ml-7 duration-500 lg:relative absolute right-3 text-xl lg:text-2xl text-white lg:hover:bg-[#151515] px-3 py-2 rounded-full"></span>
           
        </div>
        <!-- <SearchOptions :isOnSearch="isOnSearch" class="lg:hidden" @addToSearch="addSearch" :data="isSearch" :open="openForProps" v-if="open" /> -->
        </div>
       
</template>