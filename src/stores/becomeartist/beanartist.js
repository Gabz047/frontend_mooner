import { defineStore } from "pinia"
import { useLoginStore } from "../user/login"
import { SendEmailService } from "@/services"
import { useArtistProgress } from "./beartistprogress"
const loginstore = useLoginStore()
const ArtistProgressStore = useArtistProgress()
const sendemailservice = new SendEmailService()

export const useBeArtistStore = defineStore('beartist', () =>{
    
    async function CreateArtist(extrafields){
        const response = await sendemailservice.send_email_to_be_an_artist(loginstore.state.user.email)
        ArtistProgressStore.state.progress_artist[0].is_activate = true
        console.log(response)
    }

    return { CreateArtist }
})