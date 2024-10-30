import { HistoryService, UserMeService } from "@/services"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

const historyservice = new HistoryService()

export const useHistoryStore = defineStore('history', () =>{
    const history = ref([])
    const filterhistory = ref([])

    async function CreateSongHistory(token, song){
        const user = await UserMeService.GetMe(token)
        const songapi = await historyservice.GetHistory(user, token)
        const findsong = songapi.find((s) => s.id === song)

        if(!findsong){
          await historyservice.CreateHistory(user, token, song)
        }
        console.log(findsong)
    }   
    async function FilterHistory(token, link){
        const user = await UserMeService.GetMe(token)
        filterhistory.value = await historyservice.FilterHistory(user, token, link)
    }
    async function GetHistory(token){
        const user = await UserMeService.GetMe(token)
        history.value = await historyservice.GetHistory(user, token)
    }
    async function DeleteSongHistory(id, token){
        await historyservice.DeleteHistory(id, token)
        const findindex = history.value.findIndex(i => i.id === id)
        history.value.splice(findindex, 1)
    }

    const HistoryComputed = computed(() => { return history.value })
    const HistoryFilterComputed = computed(() => {return filterhistory.value})

    return { CreateSongHistory, DeleteSongHistory, GetHistory,FilterHistory, HistoryComputed, HistoryFilterComputed }
})