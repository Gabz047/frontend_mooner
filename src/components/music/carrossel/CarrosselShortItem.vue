<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  data: {
    type: Object
  },
  side: {
    type: String
  },
  animation: {
    type: Boolean
  }
});

const isAnimating = ref(false);

onMounted(() => {
  if (props.animation) {
    setTimeout(() => {
      isAnimating.value = true;
    }, 10000); // Delay de 10 segundos antes de começar a animação
  }
});

onUnmounted(()=>{
    if (props.animation) {
       isAnimating.value = false;
  
  }
})
</script>

<template>
  <div :class="[ 
      'h-[303px] absolute w-[303px] bg-slate-500 rounded-[20px]',
      props.side === 'left' ? isAnimating ? 'left-10 z-10 animation' : 'left-10 z-10' : isAnimating ? 'right-10 z-10 animation_right' : 'right-10 z-10',
    ]">
    <img class="h-full w-full object-cover rounded-[20px] z-30" :src="props.data?.cover.url" alt="">
    <div class="absolute w-full h-full z-10 top-0 rounded-[20px] bg-gradient-to-t from-black to-transparent"></div>
  </div>
</template>

<!-- <style scoped>
.animation {
  animation: animation 1s infinite; 
  transition: all 0.5s ease;
}

@keyframes animation {
  from {
    width: 303px;
    height: 303px;
    margin-left: 0px;
    z-index: 10;
  }
  to {
    width: 342px;
    height: 342px;
    margin-left: 120px;
    z-index: 20;
  }
}
</style> -->
