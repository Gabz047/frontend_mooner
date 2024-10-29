import { useArtistProgress } from "@/stores"
import { computed } from "vue"

const store = useArtistProgress()

export const artistnamevalidation = computed(() =>{
    if(!store.state.progress_artist_fields[0].value){
        return 'o campo de artista é obrigatório'
    }  
    return true
})