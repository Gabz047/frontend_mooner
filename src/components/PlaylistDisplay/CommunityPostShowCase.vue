<script setup>
import { adjusteSize } from '@/utils/music/music';
const props = defineProps({
    data: {
        type: Object
    }
})
</script>
<template>
    <div class=" min-w-56 h-48 mt-2 rounded-lg flex flex-col justify-between bg-white p-2 lg:w-[95%]">
        <div class="w-full h-8 flex justify-center gap-2 items-center">
            <div class="h-full w-8">
                <img src="../../assets/images/luuna.png" alt="">
            </div>
            <p class="text-black font-medium">{{props.data.title}}</p>
            <span class="mdi mdi-check-decagram text-[#8000ff]"></span>
        </div>
        <div class="w-full flex justify-center items-center mt-2">
            
            <p class="text-black">{{ adjusteSize(props.data.description, 115, 115) }}</p>
        </div>
        <div class="w-full flex justify-center mt-1">
            <p class="text-[#8000ff] font-light">{{props.data.likes}} {{ props.data.likes == 1 ? 'curtida' : 'curtidas' }}</p>
        </div>
    </div>
</template>
<style scooped>
::-webkit-scrollbar {
  width: 3px; /* width of the entire scrollbar */
  height: 10px;
}

::-webkit-scrollbar-track {
  background-color: rgb(34, 34, 34);
  border-radius: 10px; /* color of the tracking area */
  width: 1px;
  height: 1px;
}

::-webkit-scrollbar-thumb {
  background-color: #6340AE; /* color of the scroll thumb */
  border-radius: 10px; /* roundness of the scroll thumb */
  width: 1px;
  height: 1px;
}
</style>
