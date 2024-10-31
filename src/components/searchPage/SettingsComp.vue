<script setup lang="ts">
import { computed,  ref } from 'vue';
import { useHistoryStore, useLoginStore } from '@/stores';
import InputGlobal from '../global/InputGlobal.vue';
import MusicBox from '../global/MusicBox.vue';
const storeHistory = useHistoryStore()
const storeUser = useLoginStore()
const search = ref('')

const link = computed(() => {return `&search=${search.value}`})

function filter(){
    storeHistory.FilterHistory(storeUser.access, link.value)
}

function deleteALL(){
    storeHistory.DeleteAll(storeUser.access)
}

</script>
<template>
    <div class="bg-zinc-800 text-white w-64 h-[340px] rounded-xl flex flex-col gap-3 p-2">
        <div class="flex justify-between items-center">
            <h1>Ordem Alfabetica</h1>
            <label class="flex cursor-pointer w-7 select-none items-center gap-4 hover:brightness-95">
                <div class="relative">
                    <input v-model="storeHistory.historyStorage.is_sorted" @click="storeHistory.SortedHistory" type="checkbox" class="sr-only" />
                    <div :class="{'!bg-green-500' : storeHistory.historyStorage.is_sorted}" class="block h-5 w-8 rounded-full border"></div>
                    <div
                        :class="{ 'translate-x-full': storeHistory.historyStorage.is_sorted}"
                        class="dot absolute left-1 top-1 h-3 w-3 bg-white rounded-full transition-all"
                    ></div>
                </div>
            </label>
        </div>
        <div class="w-60">
            <InputGlobal container_class="search-input" placeholder="procure algo do historico" @input="filter" v-model:value="search"/>
            <div class="h-52 w-full overflow-y-auto overflow-x-hidden p-2">
                <div class="p-1" v-for="songs in storeHistory.searchhistory" :key="songs.id" v-if="search.length > 0" >
                    <MusicBox :is_search_history="true" :music_data="songs.song"/>
                </div>
                <div v-for="songs in storeHistory.HistoryComputed" class="p-1" v-else>
                    <MusicBox :is_search_history="true"  :music_data="songs.song" />
                </div>
            </div>
        </div>
        <div class="flex items-center rounded-xl p-1 cursor-default bg-red-700 gap-3 justify-center" @click="deleteALL">
            <h1 >Apagar historico</h1>
            <i class="mdi mdi-delete text-xl"></i>
        </div>
    </div>
</template>
<style >
    .search-input{
        color: white;
    }
    .search-input input{
        width: 100%;
        background-color: black;
        color: white;
        outline: 0;
        border-radius: 20px;
        font-size: 12px;
        padding: 5px;
    }
</style>