<script setup>
import router from '@/router';
import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import { ref } from 'vue';

  function gopageartist(id){
    router.push(`/artist/${id}`)
  }

  const data = ref([
    {title: 'Playlists', active: false}, {title: 'Músicas', active: false}, {title: 'Podcasts', active: false}, {title: 'Artistas', active: false}
  ])

  const selectSection = (index) => {
    for (let i = 0; i < data.value.length; i++) {
      i != index ? data.value[i].active = false : data.value[i].active = !data.value[i].active
    }
  }

</script>
<template>
  <ContainerNavigateButtons>
<NavigateHomeButtons v-for="item,index in data" :key="index" :title="item.title" @go-section="selectSection(index)" :active="item.active" />
</ContainerNavigateButtons>
</template>
