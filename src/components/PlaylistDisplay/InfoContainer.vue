<script setup>
import { onMounted, reactive, ref } from 'vue'
import {
  useSongStore,
  useLoginStore,
  usePlaylistStore,
  useUserStore,
  useImgStore,
  useQueueStore
} from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
import MusicBox from '@/components/global/MusicBox.vue'
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue'
import monn from '../assets/images/monn.jpg'
import { adjusteSize } from '@/utils/music/music'
import ButtonGlobal from '@/components/global/ButtonGlobal.vue'
import AddPlaylist from '@/components/global/AddPlaylist.vue'
import MusicBoxRemove from '@/components/global/MusicBoxRemove.vue'

import { handleFileUpload, updatePlaylists, playAndQueue } from '@/utils/playlist/playlist'

const songStore = useSongStore()
const loginStore = useLoginStore()
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
const imgStore = useImgStore()
const queueStore = useQueueStore()

const router = useRoute()
const userouter = useRouter()

const id = router.params.id
const token = loginStore.access
const songs = ref([])

// Will keep

const isEdit = () => {
  edit.value = !edit.value
}

const img = ref(null)
const saveimg = ref(null)
const edit = ref(false)
const play = ref(false)

// Will go utils

// Will go away

</script>

<template>
    <div class="w-4/12 h-full flex flex-col relative rounded-lg">
        <div class="w-full h-full relative flex justify-center">
          <div class="absolute top-5 z-30 flex gap-3 items-center w-full justify-between">
            <div class="flex ml-8 gap-3">
              <h2 class="text-white text-xl">Playlist</h2>
              <i class="mdi mdi-eye text-white text-lg"></i>
            </div>
            <div
              @click="isEdit"
              :class="{ edit: edit }"
              class="flex mr-8 items-center justify-center gap-2 cursor-pointer relative w-[20%]"
            >
              <i class="mdi mdi-file-edit text-white text-xl icon"></i>
              <p :class="{ text_edit: edit }" class="text-white text-base duration-100 edit-text">
                Editar
              </p>
            </div>
          </div>

          <div class="w-[100%] h-[70%] absolute z-30 mt-24 flex flex-col gap-3 items-center">
            <label
              for="photo"
              v-if="edit"
              class="w-[70%] h-[55%] hover:bg-[rgba(0,0,0,0.8)] bg-[rgba(0,0,0,0.6)] duration-150 absolute z-40 flex justify-center items-center cursor-pointer"
            >
              <i class="mdi mdi-image-edit text-white text-8xl"></i>
            </label>
            <img
              class="w-[70%] h-[55%] relative rounded-md"
              v-if="playlistStore.selectedPlaylist.cover || img"
              :src="
                img == null
                  ? playlistStore.selectedPlaylist.cover
                    ? playlistStore.selectedPlaylist.cover.url
                    : img
                  : img
              "
            />
            <div v-else class="w-[70%] h-[55%] relative bg-slate-300 rounded-md"></div>

            <h2 v-if="!edit" class="text-[32px] font-inter text-white text-center font-semibold">
              {{ adjusteSize(playlistStore.selectedPlaylist.name, 28, 28) }}
            </h2>
            <input
              class="w-[70%] text-white pl-3 bg-[rgba(255,255,255,0.22)] border-b-2 rounded-t-sm outline-none"
              v-else
              type="text"
              v-model="playlistStore.newPlaylist.name"
            />
            <div class="w-full text-white flex flex-col items-center justify-center">
              <div class="w-[70%] flex justify-around text-xl items-end">
                <p class="leading-none">
                  {{ playlistStore.selectedPlaylist.songs.length }}
                  {{ playlistStore.selectedPlaylist.songs.length == 1 ? 'Música' : 'Músicas' }}
                </p>
                <div class="size-2 bg-white rounded-full"></div>
                <p class="leading-none">15 Minutos</p>
              </div>
              <div
                @click="(play = !play), playAndQueue(playlistStore.selectedPlaylist.songs, queueStore)"
                class="mt-5 text-5xl leading-none cursor-pointer w-full flex justify-center"
              >
                <i :class="!play ? 'mdi mdi-play-circle' : 'mdi mdi-pause-circle'"></i>
              </div>
            </div>
            <ButtonGlobal
              v-if="edit"
              @click="updatePlaylists(playlistStore.showNewPlaylist, token, saveimg, playlistStore, imgStore, songs, userStore)"
              title="Salvar Alterações"
              background="#6340AE"
              border_radius="10px"
              color="white"
            />
          </div>

          <img
            class="w-full h-full relative rounded-md"
            v-if="playlistStore.selectedPlaylist.cover"
            :src="
              playlistStore.selectedPlaylist.cover ? playlistStore.selectedPlaylist.cover.url : monn
            "
          />
          <div class="bg-black w-full h-full absolute top-0 opacity-[85%] rounded-l-md"></div>
        </div>
      </div>
      <input class="hidden" type="file" id="photo" @change="handleFileUpload(img, saveimg)" />
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
