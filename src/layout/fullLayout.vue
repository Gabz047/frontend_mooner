<script setup>
import { RouterView } from 'vue-router';
import SideHeader from '@/components/newDesign/SideHeader.vue';
import HeaderGlobal from '@/components/global/HeaderGlobal.vue';
import { ref, shallowRef, computed } from 'vue';
import { dataHeader } from '@/utils/header/header';
const getWidthScreen = shallowRef(window.innerWidth)

const isActive = ref(false)

const getActualWidth = computed(()=>{
  if (getWidthScreen.value <= 1024 && isActive.value) {
    return true
  } else if (getWidthScreen.value > 1024) {
    return true
  }
})
</script>
<template>
     <main class="w-dvw h-dvh flex justify-between" >
    <div class="w-[10%] 1.5xl:w-[5%]" >
    <SideHeader :data="dataHeader" />
    </div>
    

   <section class="w-[79%] 1.5xl:w-[95%] xl:w-[91%] lg:w-[89%] md:w-[85%] sm:w-[82%] xsm:w-[75%]">
    <HeaderGlobal @menu="isActive = !isActive" :isResponsive="!getActualWidth" :is_blink_layout="false" />
    <RouterView class=" min-h-full min-w-full" />
  </section>
  </main>
</template>