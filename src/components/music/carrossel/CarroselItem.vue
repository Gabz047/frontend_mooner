<script setup>
import { ref, onMounted } from 'vue';
import { useQueueStore, usePlayerStore, useMoonStore } from '@/stores';
const QueueStore = useQueueStore()
const playerStore = usePlayerStore()
const moonStore = useMoonStore()
const props = defineProps({
  data: {
    type: Object,
  },
  frame: {
    type: String
  },
  song: {
    type: Object
  }
});

const isAnimating = ref(false);

function setSong() {
  if (QueueStore.state.currentSong != props.song){
    QueueStore.setCurrentSong(props.song)
    playerStore.play()
    if (moonStore.state.reconnect) {
      moonStore.sendActions('song')
    }
  }
  else {
    if (moonStore.state.reconnect) moonStore.sendActions('use');
    else playerStore.usePlay();
  }
}


onMounted(() => {
    isAnimating.value = false
  setTimeout(() => {
    isAnimating.value = true;
  }, 10000);
  isAnimating.value = false
});
</script>

<template>
  <div :class="[
      `${props.frame} duration-300 absolute bg-slate-500 rounded-[20px]`
    ]">
    <img
      class="h-full w-full object-cover rounded-[20px]"
      :src="props.data?.cover.url"
      alt=""
    />
    <div v-if="props.frame == 'frame_2'" :class="[
        'absolute bottom-8 flex justify-between z-20 text-white w-[370px]',
        { disappear: isHidden }
      ]">
      <div class="ml-5">
        <p class="text-lg">
          {{ props.data?.artists[0]?.artistic_name }} {{ props.data?.artists?.length > 1 ? '+' : '' }}
        </p>
        <p class="text-2xl">{{ props.data?.title }}</p>
      </div>
      <div>
        <span @click="setSong"

        :class="`${QueueStore.state.currentSong == props.data && playerStore.state.is_playing ? 'mdi mdi-pause' : 'mdi mdi-play-outline'}`" class=" mr-5 px-4 py-3 flex justify-center items-center bg-[rgba(90,45,186,0.4)] backdrop-blur-sm brightness-100 text-white rounded-full text-4xl z-[30]"
        ></span>
      </div>
    </div>
    <div class="absolute w-full h-full z-10 top-0 rounded-[20px] bg-gradient-to-t from-black to-transparent"></div>
  </div>
</template>

<style scoped>
.frame_0 {
    width: 303px;
    height: 303px;
    z-index: 10;
    left: 40px;
}

.frame_1 {
    width: 342px;
    height: 342px;
    z-index: 20;
    left: 180px;
}

.frame_2 {
    width: 380px;
    height: 380px;
    position: absolute;
    z-index: 30;
    left: 407px;
}

.frame_3 {
    width: 342px;
    height: 342px;
    position: absolute;
    z-index: 20;
    left: 675px;
}

.frame_4 {
    width: 303px;
    height: 303px;
    position: absolute;
    z-index: 10;
    left: 860px;
}

.disappear {
  opacity: 1;
  transition: opacity 1s ease;
}

.disappear.hidden {
  opacity: 0;
}
</style>
