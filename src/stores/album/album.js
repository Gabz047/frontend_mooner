import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { useLoginStore } from "../user/login"
import { AlbumService } from "@/services"
const LoginStore = useLoginStore()
const albumservice = new AlbumService()

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
        autor: LoginStore.state.user.email,
        songs: [],
        cover: state.value.cover
    })

    async function CreateNewAlbum(){
        for(let i = 0; i < state.value.songs.length; i++){
            newAlbum.songs.push(state.value.songs[i].id)
        }
        msg.value = 'album criado com sucesso'
        await albumservice.CreateAlbum(LoginStore.access, newAlbum)
        state.value.name = ''
        state.value.cover = ''
        state.value.songs = []
        state.value.file = ''
        state.value.albumcreated = false
    }

    return { state, msg, err, CreateNewAlbum }
})