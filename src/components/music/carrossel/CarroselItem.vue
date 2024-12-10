<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  data: {
    type: Object,
  },
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
      'h-[380px] w-[380px] z-30 relative bg-slate-500 rounded-[20px]', 'animation'
    ]">
    <img
      class="h-full w-full object-cover rounded-[20px]"
      :src="props.data?.cover.url"
      alt=""
    />
    <!-- <div :class="[
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
        <span
          class="mdi mdi-play-outline mr-5 px-4 py-3 flex justify-center items-center bg-[rgba(90,45,186,0.4)] backdrop-blur-sm brightness-100 text-white rounded-full text-4xl z-[30]"
        ></span>
      </div>
    </div> -->
    <div class="absolute w-full h-full z-10 top-0 rounded-[20px] bg-gradient-to-t from-black to-transparent"></div>
  </div>
</template>

<style scoped>
.animation {
  animation: animation 5s infinite;
}

@keyframes animation {
  20% {
    width: 303px;
    height: 303px;
    margin-left: 10px;
    z-index: 10;
  }
  40% {
    width: 342px;
    height: 342px;
    margin-left: 40px;
    z-index: 20;
  }
  60% {
    width: 380px;
    height: 380px;
    margin-left: 80px;
    z-index: 30;
  }
  80% {
    width: 342px;
    height: 342px;
    margin-left: 120px;
    z-index: 20;
  }
  100% {
    width: 303px;
    height: 342px;
    margin-left: 150px;
    z-index: 10;
  }

}

.disappear {
  opacity: 1;
  transition: opacity 1s ease;
}

.disappear.hidden {
  opacity: 0;
}
</style>
