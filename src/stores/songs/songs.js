import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { useArtistProgress } from "../becomeartist/beartistprogress"
import { useLoginStore } from "../user/login"
import { SongsService } from "@/services"
import { useStorage } from "@vueuse/core"
const ArtistProgressStore = useArtistProgress()
const LoginStore = useLoginStore()
const Songservice = new SongsService()
export const useSongsStore = defineStore('songs', ()=>{
    const realized_first_song = useStorage('realized_storage',{
        is_realized: false
    })
    const songs = ref([])

    const newsong = reactive({
        title: null,
        artists: [],
        lyrics: null,
        genre: null,
        cover: null,
        player: null
    })
    
    const msg = ref(null)
    const err = ref(false)

    async function CreateNewSong(){  
        newsong.title = ArtistProgressStore.state.artist_create_song_fields[0].value
        newsong.genre = ArtistProgressStore.state.artist_create_song_fields[1].value
        newsong.lyrics = ArtistProgressStore.state.artist_create_song_fields[2].value  
        if(!newsong.title || !newsong.player || !newsong.cover){
            err.value = true
            msg.value = 'preencha os campos corretamente'
        }
        else{
            newsong.artists = [LoginStore.state.user.email]
            msg.value = 'bem vindo ao mooner, novo artista'
            err.value = false
            await Songservice.CreateNewSong(newsong, LoginStore.access)
        }   
    }

    return {CreateNewSong, newsong, msg, err, realized_first_song}
})