import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { AlbumService } from "@/services"
const albumservice = AlbumService

export const useAlbumStore = defineStore('album', () =>{
    const state = useStorage('albumstorage', {
        name: '',
        file: '',
        songs: [],
        cover: '',
        albumcreated: false
    })
    const msg = ref('')
    const err = ref(false)
    const newAlbum = reactive({
        name: state.value.name,
        autor: '',
        songs: [],
        cover: state.value.cover
    })

    async function CreateNewAlbum(token, user){
        newAlbum.autor = user
        for(let i = 0; i < state.value.songs.length; i++){
            newAlbum.songs.push(state.value.songs[i].id)
        }
        msg.value = 'album criado com sucesso'
        await albumservice.CreateAlbum(token, user, newAlbum)
        state.value.name = ''
        state.value.cover = ''
        state.value.songs = []
        state.value.file = ''
        state.value.albumcreated = false
    }

    return { state, msg, err, CreateNewAlbum }
})