import { HistoryService, UserMeService } from "@/services"
import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useHistoryStore = defineStore('history', () =>{
    const historyStorage = useStorage('history', {
        is_sorted: false
    })
    const history = ref([])
    const searchhistory = ref([])

    async function CreateSongHistory(email, token, song){ 
        const songapi = await HistoryService.GetHistory(email, token)
        const findsong = songapi.find((s) => s.song.id === song)

        if(!findsong){
          await HistoryService.CreateHistory(email, token, song)
        }
    } 
    function SortedHistory(){
        if(historyStorage.value.is_sorted){
            history.value.sort((a, b) => b.song.title.localeCompare(a.song.title))
            historyStorage.value.is_sorted = false
        }
        else{
            history.value.sort((a, b) => a.song.title.localeCompare(b.song.title))
            historyStorage.value.is_sorted = true
        }   
    }
    async function SearchHistory(email, token, search){
        searchhistory.value = await HistoryService.FilterHistory(email, token, search)
        console.log(searchhistory.value)
    }
    async function GetHistory(email, token){
        history.value = await HistoryService.GetHistory(email, token)
    }
    async function DeleteSongHistory(id, token){
        await HistoryService.DeleteHistory(id, token)
        const findindex = history.value.findIndex(i => i.id === id)
        history.value.splice(findindex, 1)
    }
    async function DeleteAll(email, token){
        await HistoryService.DeleteAllHistory(email, token)
        history.value = []
    }
    const HistoryComputed = computed(() => { return history.value })
    const HistoryFilterComputed = computed(() => {return searchhistory.value})

    return { historyStorage, searchhistory, DeleteAll, SortedHistory, CreateSongHistory, DeleteSongHistory, GetHistory, SearchHistory, HistoryComputed, HistoryFilterComputed }
})