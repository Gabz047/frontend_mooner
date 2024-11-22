<script setup>
import { onMounted, reactive, ref } from 'vue'
import {
  useLoginStore,
  usePlaylistStore,
} from '@/stores/index'

import monn from '@/assets/images/monn.jpg'
import { adjusteSize } from '@/utils/music/music'
import ButtonGlobal from '@/components/global/ButtonGlobal.vue'

const loginStore = useLoginStore()
const playlistStore = usePlaylistStore()


const token = loginStore.access
const songs = ref([])

const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  play: {
    type: Boolean,
    default: false
  },
  img: {
    type: Object,
  },
  saveimg: {
    type: Object,
  },
})

const emits = defineEmits([
  'updatePlaylist',
  'playAndQueue',
  'sendEmitData',
  'isEdit',
  'isPlay'
])

const data = reactive({
  playlist: playlistStore.showNewPlaylist,
  token: token,
  image: props.saveimg,
  songs: songs.value
})

</script>

<template>
 <div class="w-4/12 lg:w-full lg:h-[700px] h-full flex flex-col relative rounded-l-lg sm:h-[600px]">
        <div class="w-full h-full relative flex justify-center ">
          <div class="absolute top-5 z-30 flex gap-3 items-center w-full justify-between">
            <div class="flex ml-8 gap-3">
              <h2 class="text-white text-xl">Playlist</h2>
              <i class="mdi mdi-eye text-white text-lg"></i>
            </div>
            <div
              @click="emits('isEdit')"
              :class="{ edit: props.edit }"
              class="flex mr-8 items-center justify-center gap-2 cursor-pointer relative w-[20%] lg:w-[90px]"
            >
              <i class="mdi mdi-file-edit text-white text-xl icon"></i>
              <p :class="{ text_edit: props.edit }" class="text-white text-base duration-100 edit-text">
                Editar
              </p>
            </div>
          </div>

          <div class="w-[100%] h-[70%] absolute z-30 mt-24 lg:mt-20 flex flex-col gap-3 sm:gap-10 items-center">
            <div class="w-[70%] h-[55%] relative rounded-lg lg:w-[70%] lg:h-[80%] sm:w-[70%] sm:h-[100%] xsm:h-[70%] xsm:w-[90%]">
            <label
              for="photo"
              v-if="props.edit"
              class="lg:rounded-lg w-full h-full hover:bg-[rgba(0,0,0,0.8)] bg-[rgba(0,0,0,0.6)] duration-150 absolute z-40 flex justify-center items-center cursor-pointer"
            >
              <i class="mdi mdi-image-edit sm:text-5xl text-white text-8xl"></i>
            </label>
            <img
              class="w-full h-full rounded-lg"
              v-if="playlistStore.selectedPlaylist.cover || props.img"
              :src="
                props.img == null
                  ? playlistStore.selectedPlaylist.cover
                    ? playlistStore.selectedPlaylist.cover.url
                    : img
                  : img
              "
            />
            <div v-else class="w-[70%] h-[55%] lg:w-[70%] lg:h-[80%] sm:w-[70%] sm:h-[100%] xsm:h-[70%] xsm:w-[90%] relative bg-slate-300 rounded-l-lg"></div>
          </div>
           

            <h2 v-if="!props.edit" class="text-[32px] font-inter text-white text-center font-semibold">
              {{ adjusteSize(playlistStore.selectedPlaylist.name, 28, 28) }}
            </h2>
            <input
              class="w-[70%] lg:h-[55%] sm:h-16 lg:w-[70%] sm:w-[70%] xsm:w-[90%] text-white pl-3 bg-[rgba(255,255,255,0.22)] border-b-2 rounded-t-sm outline-none"
              v-else
              type="text"
              v-model="playlistStore.newPlaylist.name"
            />
            <!-- w-[70%] h-[55%] relative rounded-lg lg:w-[70%] lg:h-[80%] sm:w-[70%] sm:h-[100%] xsm:h-[70%] xsm:w-[90%] -->
            <div class="xsm:w-full text-white flex flex-col items-center justify-center">
              <div class="w-full xsm:w-full flex justify-around text-xl items-end gap-5">
                <p class="leading-none xsm:text-[16px]">
                  {{ playlistStore.selectedPlaylist.songs.length }}
                  {{ playlistStore.selectedPlaylist.songs.length == 1 ? 'Música' : 'Músicas' }}
                </p>
                <div class="size-2 xsm:size-1 bg-white rounded-full"></div>
                <p class="leading-none xsm:text-[16px]">15 Minutos</p>
              </div>
              <div
                @click="emits('isPlay'), emits('playAndQueue', songs)"
                class="mt-5 text-5xl leading-none cursor-pointer w-full flex justify-center"
              >
                <i :class="!props.play ? 'mdi mdi-play-circle' : 'mdi mdi-pause-circle'"></i>
              </div>
            </div>
            <ButtonGlobal
              v-if="edit"
              @click="emits('sendEmitData', data), emits('updatePlaylist')"
              title="Salvar Alterações"
              background="#6340AE"
              border_radius="10px"
              color="white"
            />
          </div>

          
          <div class="h-full w-full relative rounded-l-lg lg:rounded-none image" :style="`background-image: url(${playlistStore.selectedPlaylist.cover ? playlistStore.selectedPlaylist.cover.url : monn});`"></div>
          <div class="bg-black w-full h-full lg:h-[110%] lg:opacity-100 lg:bg-none absolute top-0 opacity-[85%] rounded-l-lg lg:rounded-none overlay"></div>
        </div>
      </div> <!---->
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

@media (max-width: 1024px) {
  .overlay {
    background: rgb(18,18,18);
    background: linear-gradient(180deg, rgba(18,18,18,0.5467436974789917) 0%, rgba(18,18,18,1) 76%);
  }

  .edit {
  width: 90px;
  transition: 0.5s;
  background-color: aquamarine;

  & .text_edit {
    transition: 0.3s;
    opacity: 0;
  }
  & .icon {
    left: 45px;
    font-size: 30px;
  }
}
}

.image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

</style>
