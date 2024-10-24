import { defineStore } from "pinia"
import { useLoginStore } from "../user/login"
import { useArtistProgress } from "./beartistprogress"
import { reactive, ref } from "vue"
import { artistnamevalidation } from "@/utils/validations/artist/artisticnamevalidation"
import { aboutvalidation } from "@/utils/validations/artist/aboutvalidation"
import { ArtistService } from "@/services"
const loginstore = useLoginStore()
const ArtistProgressStore = useArtistProgress()
const artistservice = new ArtistService()


export const useBeArtistStore = defineStore('beartist', () =>{
    const newartist = reactive({
        user: null,
        artistic_name: null,
        instagram: null,
        twitter: null,
        youtube: null,
        about: null
    })

    const msg = ref(null)
    const err = ref(false)

    async function CreateArtist(){
        if(artistnamevalidation.value !== true && aboutvalidation.value !== true){
            err.value = true
            msg.value = 'preencha os campos obrigatórios'
        }
        else if(artistnamevalidation.value !== true){
            err.value = true
            msg.value = aboutvalidation.value
        }
        else if(aboutvalidation.value !== true){
            err.value = true
            msg.value = aboutvalidation.value
        }
        else{
            newartist.user = loginstore.state.user.email
            newartist.artistic_name = ArtistProgressStore.state.progress_artist_fields[0].value
            newartist.instagram = ArtistProgressStore.state.progress_artist_fields[1].value
            newartist.twitter = ArtistProgressStore.state.progress_artist_fields[2].value
            newartist.youtube = ArtistProgressStore.state.progress_artist_fields[3].value
            newartist.about = ArtistProgressStore.state.progress_artist_fields[4].value
            msg.value = 'verifique seu email'
            err.value = false
            await artistservice.CreateNewArtist(newartist, loginstore.access)
        }
        
    }
    return { CreateArtist, msg, err }
})