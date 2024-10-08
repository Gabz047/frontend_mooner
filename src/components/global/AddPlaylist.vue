<script setup>
import { ref } from 'vue'
import { adjusteSize } from '@/utils/music/music';
const add = ref(false)
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})


</script>
<template>
  <div
    class="w-72 bg-[#313131] p-2 rounded-xl flex justify-center flex-col gap-5 max-h-72 absolute z-30 top-16 right-0"
  >
    <div v-show="add == false">
      <p class="text-white text-center p-1">Ainda não possui nenhuma playlist?</p>
      <span
        @click="add = !add"
        class="flex justify-center gap-3 items-center cursor-pointer duration-200 rounded-xl hover:invert hover:bg-black p-1"
      >
        <img class="h-8 w-8" src="@/assets/images/icons/add.svg" alt="" />
        <p class="text-white">Crie sua playlist</p>
      </span>
    </div>
    <div v-show="add == true">
      <p class="text-white text-center">A qual playlist deseja adicionar a música?</p>
      <div class="flex flex-col gap-5 overflow-auto max-h-52 mt-5 ">
        <div class="flex items-center p-2 rounded-md" v-for="item, index in props.data" :key="index">
          <img class="w-3/12 h-14 rounded-md" :src="item.img" alt="" />
          <div
            class="w-9/12 flex gap-1 items-center justify-between cursor-pointer hover:brightness-75"
          >
            <p class="text-white text-base ml-2">{{ adjusteSize(item.tittle, 20, 25) }}</p>
            <img class="h-6 w-6" src="@/assets/images/icons/add.svg" alt="" />
          </div>
        </div>
      </div>
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
