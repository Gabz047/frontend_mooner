<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ButtonGlobal from '../global/ButtonGlobal.vue';
import { useHistoryStore, useLoginStore } from '@/stores';
const check = ref(false)
const storeHistory = useHistoryStore()
const storeUser = useLoginStore()
const filter = ref([])
const link = ref('&song=')

async function filtersongs(song){
    if(filter.value.includes(song)){
        const findindex = filter.value.findIndex((s) => s === song)
        filter.value.splice(findindex, 1)
        link.value = ''
        link.value += '&song=' + filter.value.join(',') 
        storeHistory.FilterHistory(storeUser.access, link.value) 
    }
    else{
        filter.value.push(song)
        link.value = ''
        link.value += '&song=' + filter.value.join(',') 
        storeHistory.FilterHistory(storeUser.access, link.value) 
    }
}
</script>
<template>
    <div class="absolute right-0 top-9 mr-8 bg-zinc-800 text-white  w-96 p-2">
        <div class="flex justify-end">
            <img src="../../assets/images/PainelControler.png" @click="$emit('closesettings')">
        </div >
            <h1 class="p-2 font-extralight">Músicas</h1>
        <div class="flex flex-col max-h-52 overflow-auto gap-2 ">
            <div class="flex justify-between bg-zinc-700 items-center text-base p-2 " v-for="songs, index in storeHistory.HistoryComputed" :key="songs.id" @click="filtersongs(songs.song.id)">
                <h1 class="text-lg">{{songs.song.title}}</h1>
                <h1 v-if="filter.includes(songs.song.id)">✓</h1>
            </div>
        </div>
        <h1 class="p-2 font-extralight">Artistas</h1>
        <div class="flex flex-col max-h-52 overflow-auto gap-2">
                <div class="flex justify-between bg-zinc-700 items-center text-base p-2 " @click="check = !check">
                    <h1 class="text-lg">tue</h1>
                    <h1 v-if="check">✓</h1>
                </div>
        </div>
    </div>
</template>
<style>
    
</style>