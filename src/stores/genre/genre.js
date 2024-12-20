import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { GenreService } from "@/services"
import { useStorage } from "@vueuse/core"
const genreService = GenreService

export const useGenreStore = defineStore('genre', () =>{
    const genre = ref([{description: 'Todos'}])
    
    async function GetGenre(token){
        const genres = await genreService.GetGenre(token)
        genre.value = genre.value.concat(genres) 
        return genres
    }

    
    const selectGetType = useStorage('typeStorage', {
        type: 'Músicas',
        selectedGenre: 'Todos',
        toLeft: 0
    }) 

    const returnToLeft = computed(()=>{
        if (selectGetType.value.selectedGenre != 'Todos' || selectGetType.value.selectedGenre != '') {
            return selectGetType.value.toLeft
        } else {
            selectGetType.value.toLeft = 0
            return selectGetType.value.toLeft
        }
    })

    

    return { GetGenre, genre, selectGetType, returnToLeft }
})