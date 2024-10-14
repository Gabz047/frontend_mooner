import { SearchService } from "@/services"
import { defineStore } from "pinia"
import { ref } from "vue"

const searchservice = new SearchService()

export const useSearchStore = defineStore('search', () =>{
    
    const research = ref([])
    
    async function searchforitens(token, usersearch){
        research.value = await searchservice.GetResults(token, usersearch) 
        console.log(research.value)
    }

    return {searchforitens, research}
})