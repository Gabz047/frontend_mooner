<script setup>
import { CarrosselMidItem, CarroselItem, CarrosselShortItem } from '@/components';
import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});


const timer = shallowRef(0);
const selectedFrames = ref([]);

const updateFrames = () => {

  timer.value = (timer.value + 1) % props.data.length;
 
  selectedFrames.value = [
    ...props.data.slice(timer.value, timer.value + 7),
  ];
};


let loopTimer = null;
const startLoop = () => {
  updateFrames(); 
  loopTimer = setInterval(updateFrames, 2000); 
};


const stopLoop = () => {
  if (loopTimer) clearInterval(loopTimer);
};


onMounted(startLoop);
onBeforeUnmount(stopLoop);
</script>

<template>
  <section>
    <div class="h-[380px] items-center justify-center w-full flex">
      
      <CarrosselShortItem :data="selectedFrames[1]" animation="true" :side="'right'" />
      <CarrosselMidItem :data="selectedFrames[2]" :side="'right'" />
      <CarroselItem :data="selectedFrames[3]" />
      <CarrosselMidItem :data="selectedFrames[4]" :side="'left'" />
      <CarrosselShortItem :data="selectedFrames[5]" :side="'left'" />
      <CarrosselShortItem :data="selectedFrames[0]" animation="false":side="'left'" />
    </div>
  </section>
</template>
