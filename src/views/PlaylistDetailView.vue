<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useSongStore, useLoginStore, usePlaylistStore, useUserStore, useImgStore, useQueueStore } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router';
import MusicBox from '@/components/global/MusicBox.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import monn from '../assets/images/monn.jpg'
import { adjusteSize } from '@/utils/music/music';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import AddPlaylist from '@/components/global/AddPlaylist.vue';
const songStore = useSongStore()
const loginStore = useLoginStore()
const playlistStore = usePlaylistStore()
const userStore = useUserStore()
const imgStore = useImgStore()
const access = ref(loginStore.access)
const router = useRoute()
const userouter = useRouter()

const id = router.params.id
const token = loginStore.access
onMounted(()=>{
  playlistStore.selectedPlaylist
})

const edit = ref(false)

const play = ref(false)
const attach = ref(null)

const isEdit = () => {
  edit.value = !edit.value
}

const newPlaylist = reactive({
  id: playlistStore.selectedPlaylist.id,
  name: playlistStore.selectedPlaylist.name,
  owners: [userStore.myuser.email],
  cover: attach.value,
  songs: playlistStore.selectedPlaylist.songs
})

const newSongs = ref([])
const queueStore = useQueueStore()
const img = ref(null)
const saveimg = ref(null)

async function handleFileUpload(e) {
  const target = e.target
  if (target && target.files) {
    const file = target.files[0]
    img.value = URL.createObjectURL(file)
    saveimg.value = file
    console.log('img legal:', img.value)
  }
}

const addToPlaylist = (song) => {
  const index = playlistStore.selectedPlaylist.songs.findIndex(s => s == song.id)
  if (playlistStore.selectedPlaylist.songs.filter(s => s == song.id).length > 0) {
    playlistStore.state.selectedPlaylist.songs.splice(index, 1)
    console.log(playlistStore.selectedPlaylist.songs)
    
  } else {
    playlistStore.state.selectedPlaylist.songs.push(song.id)
  console.log(playlistStore.selectedPlaylist.songs)
  
  }
}

const verifyInPlaylist = (song) => {
  if (playlistStore.selectedPlaylist.songs.filter(s => s == song.id).length > 0) {
    return true
  } else {
    return false
  }
}

const transformToId = () => {
  for (let i = 0; i < playlistStore.selectedPlaylist.songs.length; i++) {
    playlistStore.state.selectedPlaylist.songs[i] = playlistStore.selectedPlaylist.songs[i].id
  }
}

const updatePlaylists = async (playlist, token, image) => {
  if (image) {
  await imgStore.CreateNewImg(image, token).then((response)=>{
    console.log('response:', response)
    attach.value = response
  });
  await imgStore.GetImagesByAttachment_key(attach.value, token)
  newPlaylist.cover = imgStore.selectedImage.attachment_key
  console.log(newPlaylist)
  transformToId()
  }
  
  setTimeout(()=>{
    console.log(newSongs.value)
    playlistStore.updatePlaylist(playlist, token).then((response)=>{
      console.log('playlist response', response)
    })
    userouter.push('/')
    console.log('newPlaylist response', newPlaylist)
    setTimeout(()=>{
      window.location.reload()
    }, 500)
  }, 1000)
  
}

const playAndQueue = (songs) => {
  queueStore.state.queue = songs
}

const alreadyHas = ref(false)

const isOn = ref(false)



</script>
<template>
  <div v-if="isOn" class="fixed left-0 z-[50] w-dvw h-dvh flex justify-center items-center">
    <div class="w-96 h-[500px] bg-[#121212] rounded-lg absolute z-[60] flex flex-col items-center">
      <span @click="isOn = !isOn, playlistStore.selectedPlaylist.songs.length <= 0 ? playlistStore.state.selectedPlaylist.songs = [] : ''" class=" absolute right-3 cursor-pointer text-xl top-2 mdi mdi-close-circle text-red-500"></span>
      <p class="h-[10%] text-xl text-white mt-3">Adicione Suas Músicas</p>

      <div class="max-h-[85%] h-[85%] w-11/12 bg-[#1a1a1a] overflow-auto">
        <div class="w-full p-4">
         
       <div v-if="!alreadyHas" @click="addToPlaylist(item)" class="h-16 w-full flex relative gap-5 hover:brightness-90 duration-100 hover:bg-[rgba(0,0,0,0.3)] rounded-xl  text-white" v-for="item in songStore.songs">
        <div v-if="verifyInPlaylist(item)" class="absolute flex justify-center items-center z-[70] bg-purple-300 opacity-80 w-full h-full rounded-xl">
          <i class="mdi mdi-check-decagram text-black text-4xl"></i>
        </div>
        <img class="rounded-l-xl h-full w-[30%]" :src="item.cover.url" alt="">
        <div>
        <p class="text-xl">{{ item.title }}</p>
        <p class="text-lg" v-for="artist in item.artists">{{ artist.artistic_name }}</p>
      </div>
       </div>
       
      </div>
      
      </div>
      <ButtonGlobal class="mt-3 mb-3" @click="updatePlaylists(newPlaylist, token), alreadyHas ? alreadyHas = false : alreadyHas" title="Salvar Músicas" background="#6340AE" border_radius="10px" color="white" />
    </div>
   <div class="w-full h-full bg-black opacity-50"></div>
  </div>
  <main class=" w-full min-h-screen-minus-80 flex justify-end gap-4">
    
    <section class="my-auto mr-2 h-full  flex rounded-lg w-[98%] bg-[#121212]">

      <div class="w-4/12 h-full flex flex-col relative  rounded-lg"> 
        <div class="w-full h-full relative flex justify-center">
        <div class="absolute top-5 z-30 flex gap-3 items-center w-full justify-between">
          <div class="flex ml-8 gap-3 ">
        <h2 class="text-white text-xl"> Playlist </h2>
        <i class="mdi mdi-eye text-white text-lg"></i>
        </div>
        <div @click="isEdit" :class="{edit: edit }" class="flex mr-8 items-center justify-center gap-2 cursor-pointer relative w-[20%]">
        <i class="mdi mdi-file-edit text-white text-xl icon"></i>
        <p :class="{text_edit: edit }" class="text-white text-base duration-100 edit-text">Editar</p>
        </div>
        </div>
       
        <div class="w-[100%] h-[70%] absolute z-30 mt-24 flex flex-col gap-3 items-center ">
          <label for="photo" v-if="edit" class="w-[70%] h-[55%] hover:bg-[rgba(0,0,0,0.8)] bg-[rgba(0,0,0,0.6)] duration-150 absolute z-40 flex justify-center items-center cursor-pointer">
            <i class="mdi mdi-image-edit text-white text-8xl"></i>
            
          </label>
            <img  class="w-[70%] h-[55%] relative rounded-md" v-if="playlistStore.selectedPlaylist.cover || img" :src="img == null ? playlistStore.selectedPlaylist.cover ? playlistStore.selectedPlaylist.cover.url : img : img" >
           <div v-else class="w-[70%] h-[55%] relative bg-slate-300 rounded-md"></div>

            <h2 v-if="!edit" class="text-[32px] font-inter text-white text-center font-semibold" >{{ adjusteSize(playlistStore.selectedPlaylist.name, 28, 28) }}</h2>
            <input class="w-[70%] text-white pl-3 bg-[rgba(255,255,255,0.22)] border-b-2 rounded-t-sm outline-none" v-else type="text" v-model="newPlaylist.name">
            <div class="w-full text-white flex flex-col items-center justify-center">
              <div class=" w-[70%] flex justify-around text-xl items-end">
                <p class="leading-none">{{ playlistStore.selectedPlaylist.songs.length }} {{ playlistStore.selectedPlaylist.songs.length == 1 ? 'Música' : 'Músicas' }}</p>
                <div class="size-2 bg-white rounded-full"></div>
                <p class="leading-none">15 Minutos</p>
              </div>
              <div @click="play = !play, playAndQueue(playlistStore.selectedPlaylist.songs)" class=" mt-5 text-5xl leading-none cursor-pointer w-full flex justify-center">
                <i :class="!play ? 'mdi mdi-play-circle' : 'mdi mdi-pause-circle'"></i>
              </div>
            </div>
            <ButtonGlobal v-if="edit" @click="updatePlaylists(newPlaylist, token, saveimg)" title="Salvar Alterações" background="#6340AE" border_radius="10px" color="white" />
        </div>

            <img  class="w-full h-full relative rounded-md" v-if="playlistStore.selectedPlaylist.cover" :src="playlistStore.selectedPlaylist.cover ? playlistStore.selectedPlaylist.cover.url : monn " >
            <div class="bg-black w-full h-full absolute top-0 opacity-[85%] rounded-l-md"></div>
        </div>
        
      </div>
      <div class="w-8/12 h-full flex flex-col items-center">
        <ButtonGlobal v-if="playlistStore.selectedPlaylist.songs.length > 0" class="mt-3 mb-3" @click="isOn = !isOn, alreadyHas = true" title="Adicionar Músicas" background="#6340AE" border_radius="10px" color="white" />
        <MusicGlobalContainer class="w-full">
          <MusicBox class="max-h-[60px]"  v-if="playlistStore.selectedPlaylist.songs.length > 0"  v-for="music, index in playlistStore.selectedPlaylist.songs" :key="index" :music_data="music" :index="index" />
            <div v-else class="w-full flex justify-center flex-col gap-3 items-center">
            <h2  class="text-2xl">Nenhuma Música na playlist ainda</h2>
            <ButtonGlobal has_icon="true" icon="mdi mdi-plus" @click="isOn = !isOn" title="Adicione uma música" background="#6340AE" border_radius="10px" color="white" />
          </div>    
        </MusicGlobalContainer>
      </div>
    </section>
   
  </main>
  <input class=" hidden" type="file" id="photo" @change="handleFileUpload">
</template>

<style scoped>


.edit-text {
    transition: 1s;
    position: absolute;
    right: 0;

  }

  .icon {
    transition: 0.3s;
    position: absolute;
    left: 0;
    z-index: 9999;
}
.edit{
 
  width: 20%;
  transition: 0.5s;
  background-color: aquamarine;

  & .text_edit {
    transition: 0.3s;
    opacity: 0;
  }
  & .icon {
    left: 35px;
    font-size: 30px;   
  }
}

</style>
