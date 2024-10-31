import { defineStore } from "pinia"
import { ref } from "vue"
import { useLoginStore } from "../user/login"
import { GenreService } from "@/services"
const genreService = new GenreService()
const LoginStore = useLoginStore()

export const useGenreStore = defineStore('genre', () =>{
    const genre = ref([])
    
    async function GetGenre(){
        const genres = await GenreService.GetGenre(LoginStore.access)
        genre.value = genres
        return genres
    }


    return { GetGenre }
})