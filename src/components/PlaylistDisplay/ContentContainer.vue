<script setup>
import {ref, onMounted } from 'vue'
import { usePlaylistStore } from '@/stores'
import MusicBox from '../global/MusicBox.vue';
import MusicBoxRemove from '../global/MusicBoxRemove.vue';
import MusicGlobalContainer from '../global/MusicGlobalContainer.vue';

const emits = defineEmits(['addToPlaylist', 'setSettings', 'setAddOn', 'setRemoveOn', 'sendEmitData', 'removeFromPlaylist'])

const props = defineProps({
  settings: {
    type: Boolean,
    default: false
  },
  addCompOn: {
    type: Boolean,
    default: false
  },
  removeOn: {
    type: Boolean,
    default: false
  },
  setAction: {
    type: String,
  }
})


const songs = ref([])
const playlistStore = usePlaylistStore()

onMounted( () => {
  console.log('rodou')
  songs.value = []

})

const data_add = (music, setAction) => {
  return {
    song: music,
    action: setAction
  }
}

// const alreadyHas = ref(false)
const setAction = ref('')
const isOn = ref(false)

</script>
<template>
     <div class="w-8/12 h-full flex flex-col items-center">
        <div class="w-full flex justify-end p-3 relative">
          <span
            @click="emits('setSettings')"
            class="mdi mdi-dots-vertical text-xl text-white hover:brightness-75 cursor-pointer"
          ></span>
          <div
            v-if="props.settings"
            class="absolute h-64 w-56 bg-[#1a1a1a] rounded-lg right-3 top-12 p-3 z-40 text-white select-none flex flex-col gap-3 cursor-pointer"
          >
            <div @click="emits('setRemoveOn')" v-if="playlistStore.selectedPlaylist ? playlistStore.selectedPlaylist.songs.length > 0 : ''" class="rounded-lg flex justify-center gap-2 items-center w-full p-3" :class="props.setAction != 'remove' ? ' hover:bg-[#222222] ' : 'bg-[#bb4343] hover:bg-[#8b3232]'">
              <i class="text-2xl mdi mdi-trash-can-outline"></i>
              <p class="text-base">Remover Músicas</p>
            </div>
            <div @click="emits('setAddOn')" class="w-full p-3 hover:bg-[#222222] rounded-lg flex justify-center gap-1 items-center">
              <i class="text-2xl mdi mdi-plus-circle-outline"></i>
              <p class="text-base">Adicionar Músicas</p>
            </div>
          </div>
        </div>
        <MusicGlobalContainer class="w-full">
          <MusicBox
            class="max-h-[60px]"
            v-if="playlistStore.selectedPlaylist.songs ? playlistStore.selectedPlaylist.songs?.length > 0 && props.setAction != 'remove' : ''"
            v-for="(music, index) in playlistStore.selectedPlaylist.songs"
            :key="index"
            :music_data="music"
            :index="index"
            @click="emits('sendEmitData'), data_add(music, 'add'), emits('addToPlaylist')"  
          />
          <div v-if="playlistStore.selectedPlaylist ? playlistStore.selectedPlaylist.songs?.length <= 0 : ''" class="w-full flex justify-center flex-col gap-3 items-center">
            <h2 class="text-2xl">Nenhuma Música na playlist ainda</h2>
            <ButtonGlobal
              has_icon="true"
              icon="mdi mdi-plus"
              @click="isOn = !isOn, setAction = 'add'"
              title="Adicione uma música"
              background="#6340AE"
              border_radius="10px"
              color="white"
            />
          </div>
          <MusicBoxRemove :remove="remove"
            class="max-h-[60px]"
            v-if="playlistStore.selectedPlaylist.songs?.length > 0 && props.setAction == 'remove'"
            v-for="(music, index) in playlistStore.selectedPlaylist?.songs"
            :key="index"
            :music_data="music"
            :index="index"
            @click="emits('sendEmitData', data_add(music, 'remove')), emits('removeFromPlaylist')"
          />
        </MusicGlobalContainer>
      </div>
</template>

<style scoped>
.edit-text {
  transition: 1s;
  position: absolute;
  right: 0;
}

.icon {
  transition: 0.3s;
  position: absolute;
  left: 0;
  z-index: 9999;
}
.edit {
  width: 20%;
  transition: 0.5s;
  background-color: aquamarine;

  & .text_edit {
    transition: 0.3s;
    opacity: 0;
  }
  & .icon {
    left: 35px;
    font-size: 30px;
  }
}
</style>
