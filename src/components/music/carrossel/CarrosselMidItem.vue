<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  data: {
    type: Object
  },
  side: {
    type: String
  }
});

const isAnimating = ref(false);

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
      'h-[342px] absolute w-[342px] bg-slate-500 rounded-[20px]',
      props.side === 'left'
        ? isAnimating ? 'left-40 z-20 animation' : 'left-40 z-20'
        : isAnimating ? 'right-40 z-30 animation_right' : 'right-40 z-30'
    ]">
    <img class="h-full w-full object-cover rounded-[20px]" :src="props.data?.cover.url" alt="">
    <div class="absolute w-full h-full z-10 top-0 rounded-[20px] bg-gradient-to-t from-black to-transparent"></div>
  </div>
</template>

<style scoped>
.animation {
  animation: animation 1s infinite;
}

.animation_right {
  animation: animation_right 1s infinite;
}

@keyframes animation {
  from {
    width: 342px;
    height: 342px;
    margin-left: 0px;
    z-index: 20;
  }
  to {
    width: 380px;
    height: 380px;
    margin-left: 265px;
    z-index: 30;
  }
}

@keyframes animation_right {
  from {
    width: 342px;
    height: 342px;
    margin-left: 0px;
    z-index: 20;
  }
  to {
    width: 303px;
    height: 303px;
    margin-left: 265px;
    z-index: 20;
  }
}
</style>
