import { defineStore } from "pinia"
import { ref } from "vue"
import { useLoginStore } from "../user/login"
import { GenreService } from "@/services"
const LoginStore = useLoginStore()
const genreService = new GenreService()


export const useGenreStore = defineStore('genre', () =>{
    const genre = ref([])
    
    async function GetGenre(){
        const genres = await genreService.GetGenre(LoginStore.access)
        genre.value = genres
        return genres
    }


    return { GetGenre }
})