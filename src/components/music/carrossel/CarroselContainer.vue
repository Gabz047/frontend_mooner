<script setup>
import { CarrosselMidItem, CarroselItem, CarrosselShortItem } from '@/components';
import { onMounted, reactive, ref, watch } from 'vue';
import { useQueueStore , usePlayerStore} from '@/stores';

const playerStore = usePlayerStore()
const QueueStore = useQueueStore()
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const frames = reactive({
  frame_1: 0,
  frame_2: 1,
  frame_3: 2,
  frame_4: 3,
  frame_5: 4
})
const connect = ref(true)
const interval = ref(null)

const startLoop = () => {
    connect.value = true
    runLoop()
  
}

const stopLoop = () => {
  connect.value = false
}


const runLoop = () => {
  if (QueueStore.state.currentSong == props.data[0] || QueueStore.state.currentSong == props.data[1] || QueueStore.state.currentSong == props.data[2] || QueueStore.state.currentSong == props.data[3] || QueueStore.state.currentSong == props.data[4]) {
  connect.value = false
    } else {
  if (connect.value) {
    if (frames.frame_1 == 4) {
      frames.frame_1 = 0
    } else {
      frames.frame_1++
    }

    if (frames.frame_2 == 4) {
      frames.frame_2 = 0
    } else {
      frames.frame_2++
    }

    if (frames.frame_3 == 4) {
      frames.frame_3 = 0
    } else {
      frames.frame_3++
    }

    if (frames.frame_4 == 4) {
      frames.frame_4 = 0
    } else {
      frames.frame_4++
    }

    if (frames.frame_5 == 4) {
      frames.frame_5 = 0
    } else {
      frames.frame_5++
    }
 
  interval.value = setTimeout(runLoop, 3000)

}
}
}

onMounted(()=>{
  startLoop()
})

watch(
  () => QueueStore.state.currentSong, // Observa a propriedade
  (newVal, oldVal) => {
    if (newVal) {
      console.log('A música atual mudou:', newVal);
      startLoop(); // Para o loop se necessário
    } else {
      console.log('Sem música atual.');
      startLoop(); // Reinicia o loop se não houver música
    }
  }
);

</script>

<template>
  <section>
    <div class="h-[380px] items-center justify-center w-full flex">
      <CarroselItem :song="props.data[0]" :data="props.data[20]" :frame="`frame_${frames.frame_1}`" />
      <CarroselItem :song="props.data[1]" :data="props.data[1]" :frame="`frame_${frames.frame_2}`" />
      <CarroselItem :song="props.data[2]" :data="props.data[2]" :frame="`frame_${frames.frame_3}`" />
      <CarroselItem :song="props.data[3]" :data="props.data[3]" :frame="`frame_${frames.frame_4}`" />
      <CarroselItem :song="props.data[4]" :data="props.data[4]" :frame="`frame_${frames.frame_5}`" />

    </div>
  </section>
</template>
