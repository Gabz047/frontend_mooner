import { useArtistProgress } from "@/stores"
import { computed } from "vue"

export const artistnamevalidation = computed(() =>{
    const store = useArtistProgress()
    if(!store.state.progress_artist_fields[0].value){
        return 'o campo de artista é obrigatório'
    }  
    return true
})