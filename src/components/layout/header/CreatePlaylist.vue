
<script setup>
import { adjusteSize, verify_active } from '@/utils/music/music';
import MusicBox from '@/components/global/MusicBox.vue';
import {ref, computed} from 'vue'
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  is_on: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([
  'createPlaylist'
])

function returnvalue(id) {
    console.log(id)
}

const music = ref([
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
])

</script>
<template>
  <div
    class="w-72 bg-[#313131] p-2 rounded-xl flex justify-center flex-col gap-5 absolute z-30 top-16 right-0"
  >
    <div>
      <p class="text-white text-center p-1">Crie Sua Playlist</p>

        <div>
            <div>
                <p>
                    Nome
                </p>
                <input type="text">
            </div>

            <div>
               <p>Músicas</p>
                <div class="h-72 overflow-auto overflow-x-hidden flex flex-col gap-3">
                    <MusicBox @click="returnvalue(1)" v-for="item, index in music" :buttons="false" :music_data="item" />
                </div>
            </div>

        </div>

      <span
        @click="emits('createPlaylist')"
        class="flex justify-center gap-3 items-center cursor-pointer duration-200 rounded-xl hover:invert hover:bg-black p-1 mt-3"
      >
        <img class="h-8 w-8" src="@/assets/images/icons/add.svg" alt="" />
        <p class="text-white">Crie sua playlist</p>
      </span>
    </div>
  </div>
</template>
<style scoped>
.box-add-music {
  & :hover {
    filter: brightness(80%);
  }
}

.verify {
  animation-name: verify;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: 1;
  border: 2px solid green;
}

@keyframes verify {
    0% {
        border: none;
    }
    100% {
        border: 2px solid green;
    }
}
</style>
