import { HistoryService, UserMeService } from "@/services"
import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

const historyservice = new HistoryService()

export const useHistoryStore = defineStore('history', () =>{
    const historyStorage = useStorage('history', {
        is_sorted: false
    })
    const history = ref([])
    const filterhistory = ref([])
    const searchhistory = ref([])

    async function CreateSongHistory(token, song){ 
        const songapi = await historyservice.GetHistory(user.email, token)
        const user = await UserMeService.GetMe(token)
        const findsong = songapi.find((s) => s.id === song)

        if(!findsong){
          await historyservice.CreateHistory(user.email, token, song)
        }
        console.log(findsong)
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
    async function FilterHistory(token, link){
        const user = await meService.GetMe(token)
        searchhistory.value = await historyservice.FilterHistory(user.email, token, link)
        console.log(searchhistory.value)
    }
    async function GetHistory(token){
        const user = await meService.GetMe(token)
        history.value = await historyservice.GetHistory(user.email, token)
    }
    async function DeleteSongHistory(id, token){
        await historyservice.DeleteHistory(id, token)
        const findindex = history.value.findIndex(i => i.id === id)
        history.value.splice(findindex, 1)
    }
    async function DeleteAll(token){
        const user = await meService.GetMe(token)
        await historyservice.DeleteAllHistory(user.email, token)
        history.value = []
    }
    const HistoryComputed = computed(() => { return history.value })
    const HistoryFilterComputed = computed(() => {return filterhistory.value})

    return { historyStorage, searchhistory, DeleteAll, SortedHistory, CreateSongHistory, DeleteSongHistory, GetHistory,FilterHistory, HistoryComputed, HistoryFilterComputed }
})