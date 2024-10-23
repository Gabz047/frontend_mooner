<script setup>
import { onMounted, ref } from 'vue';
import router from '@/router';

import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import MusicBox from '@/components/global/MusicBox.vue';
import { data_section, data_page, data_music_home, selectSection} from '@/utils/music/music';
 
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
  for (let i = 0; i < data_music_home.value.length; i++) {
    for (let a = 0; a < music.value.length; a++) {
      data_music_home.value[i].music.push(music.value[a]) 
    }
    
  }
  
})


</script>
<template>
  <main class=" w-full flex justify-end gap-4">
    
    <section class="my-auto mr-2 h-full rounded-lg w-[98%] bg-[#121212]">
      <ContainerNavigateButtons class="mt-5">
        <NavigateHomeButtons :has_active_bg="true" v-for="item,index in data_page" :key="index" :title="item.title" :active="item.active" @goSection="selectSection(index, data_page)" />
      </ContainerNavigateButtons>

      <ContainerNavigateButtons justify="justify-start" class="mt-2 px-5">
        <NavigateHomeButtons :has_active_bg="false" v-for="item,index in data_section" :key="index" :title="item.title" :active="item.active" @goSection="selectSection(index, data_section)" />
      </ContainerNavigateButtons>

      <MusicGlobalContainer class="mt-3" :title="item.title" v-for="item, index in data_music_home" :key="index">
        <MusicBox  v-for="music, index in item.music" :key="index" :music_data="music" :index="index" :has_playlist="music.has_playlist" />
      </MusicGlobalContainer>

    </section>
  </main>
</template>
