<script setup>
import router from '@/router';
import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import MusicBox from '@/components/global/MusicBox.vue';
import { onMounted, ref } from 'vue';

  function gopageartist(id){
    router.push(`/artist/${id}`)
  }
  const data_section = ref([
  const data = ref([
    {title: 'Playlists', active: false}, {title: 'Músicas', active: false}, {title: 'Podcasts', active: false}, {title: 'Artistas', active: false}
  ])

  const data_page = ref([
    {title: 'Minha Biblioteca', active: true}, {title: 'Navegar', active: false}
  ])

  const data_music = ref([
    {music: [], title: ''}, {music: [], title: 'Recomendamos para você'}
  ])

  const selectSection = (index, data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].active = i === index ? data[i].active = true : false;
  }
};

const music = ref([
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
  {title: 'Binding Lights', artist: 'The Weekend', 
    has_playlist: false
  },
])

onMounted(()=>{
  for (let i = 0; i < data_music.value.length; i++) {
    for (let a = 0; a < music.value.length; a++) {
      data_music.value[i].music.push(music.value[a]) 
    }
    
  }
  
})

</script>
<template>
  <main class="h-dvh w-dvw flex justify-between gap-4">
    <section class="my-auto ml-2 h-[95%] rounded-lg w-3/12 bg-[#121212] "></section>
    <section class="my-auto mr-2 h-[95%] rounded-lg w-9/12 bg-[#121212]">
      <ContainerNavigateButtons class="mt-5">
        <NavigateHomeButtons :has_active_bg="true" v-for="item,index in data_page" :key="index" :title="item.title" :active="item.active" @goSection="selectSection(index, data_page)" />
      </ContainerNavigateButtons>

      <ContainerNavigateButtons justify="justify-start" class="mt-2 px-5">
        <NavigateHomeButtons :has_active_bg="false" v-for="item,index in data_section" :key="index" :title="item.title" :active="item.active" @goSection="selectSection(index, data_section)" />
      </ContainerNavigateButtons>

      <MusicGlobalContainer class="mt-3" :title="item.title" v-for="item, index in data_music" :key="index">
        <MusicBox  v-for="music, index in item.music" :key="index" :music_data="music" :index="index" :has_playlist="music.has_playlist" />
      </MusicGlobalContainer>
    </section>
  </main>
</template>
