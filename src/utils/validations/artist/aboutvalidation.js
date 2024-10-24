import { useArtistProgress } from "@/stores"
import { computed } from "vue"

const store = useArtistProgress()

export const aboutvalidation = computed(() =>{
    if(!store.state.progress_artist_fields[4].value){
        return 'o campo de biografia é obrigatório'
    }  
    else if(store.state.progress_artist_fields[4].value.length > 4000){
        return 'seu campo deve ter no maximo 4000 caracteres'
    }
    return true
})