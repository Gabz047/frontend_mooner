<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import MusicBox from '@/components/global/MusicBox.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import HistoryComp from '@/components/searchPage/HistoryComp.vue';
import SettingsComp from '@/components/searchPage/SettingsComp.vue';
import { useHistoryStore, useLoginStore, useSearchStore } from '@/stores';
import HistoryConnect from '@/components/searchPage/HistoryConnect.vue';
import { onMounted, onUpdated, ref } from 'vue';
const historysection = ref(false)
const issettings = ref(true)
const search = ref('')
const storeUser = useLoginStore()
const searchStore = useSearchStore()
const historyStore = useHistoryStore()

onUpdated(() =>{
  historyStore.GetHistory(storeUser.access)
})

onMounted( () =>{
  historyStore.GetHistory(storeUser.access)
})
</script>
<template>
<div class="w-100 h-screen flex justify-center">
  <main class="p-6 h-full w-full bg-black flex" >
    <section class="bg-stone-950 w-full rounded-3xl">
      <div class="flex w-full flex-col  h-full p-4">
        <div >
          <InputGlobal placeholder="Pesquise algo aqui..." class="w-full" type="text" id="search-music" @input="searchStore.searchforitens(storeUser.access, search)" v-model:value="search"/>
          <HistoryConnect title="Navegar"/>
        </div>
        <div class="flex justify-between">
        <MusicGlobalContainer justify="justify-center" height="h-28" class="bg-stone-950 overflow-y">
              <HistoryComp v-for="itens in historyStore.HistoryComputed" :key="itens.id" :id="itens.id" :date="itens.date" :song="itens.song" :is_history="!historysection" v-if="search.length === 0 && historyStore.HistoryFilterComputed.length === 0"/>
              <HistoryComp v-for="filteritens in historyStore.HistoryFilterComputed" :key="filteritens.id" :id="filteritens.id" :date="filteritens.date" :song="filteritens.song" :is_history="!historysection"  v-else-if="historyStore.HistoryFilterComputed.length > 0" />
              <MusicBox v-for="songs in searchStore.research"  :key="songs.id" :music_data="songs"  v-else-if="searchStore.research.length > 0"  @click="historyStore.CreateSongHistory(storeUser.access, songs.id)"/>
              <h1 v-else>Resultados não encontrados</h1>
        </MusicGlobalContainer> 
        <SettingsComp />
      </div>
      </div>
    </section>
  </main>
</div>
</template>
<style>
#search-music{
  background-color: white;
  height: 35px;
  color: black;
  border: none;
  padding: 10px;
  font-size: 14px;
  width: 100%;
}
</style>
