<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import MusicBox from '@/components/global/MusicBox.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import HistoryComp from '@/components/searchPage/HistoryComp.vue';
import SettingsComp from '@/components/searchPage/SettingsComp.vue';
import { useHistoryStore, useLoginStore } from '@/stores';
import HistoryConnect from '@/components/searchPage/HistoryConnect.vue';
import { onMounted, onUpdated, ref } from 'vue';
const historysection = ref(false)
const search = ref('')
const storeUser = useLoginStore()
const historyStore = useHistoryStore()


onMounted( async () =>{
  const history = await historyStore.GetHistory(storeUser.user.email, storeUser.access)
  console.log(history)
})
</script>
<template>
<div class="w-100 h-screen flex justify-center">
  <main class="p-6 h-full w-full bg-black flex" >
    <section class="bg-stone-950 w-full rounded-3xl">
      <div class="flex w-full flex-col  h-full p-4">
        <div >
          <HistoryConnect title="Navegar" />
        </div>
        <div class="flex justify-between">
        <MusicGlobalContainer justify="justify-center" height="h-28" class="bg-stone-950 overflow-y">
              <HistoryComp v-for="itens in historyStore.HistoryComputed" :history="true" :key="itens.id" :id="itens.id" :date="itens.date" :song="itens.song" />"
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
