import { defineStore } from "pinia"
import { ref } from "vue"
import { GenreService } from "@/services"
const genreService = GenreService

export const useGenreStore = defineStore('genre', () =>{
    const genre = ref([])
    
    async function GetGenre(token){
        const genres = await genreService.GetGenre(token)
        genre.value = genres
        return genres
    }


    return { GetGenre }
})