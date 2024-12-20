import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { LunnaIAService } from "@/services";

export const useLunnaIAStore = defineStore('IA', () =>{
    const state = reactive({
        chat: [],
        loading: false,
        error: null,
        connection: false
      })
    const CreateAnswer = async (UserAwswer, token) => {
        state.loading = true
        try{
            state.chat.push(await LunnaIAService.LuunaCreateResponse(UserAwswer, token))
            console.log(state.chat)
        }
        catch(error){
            state.error = error
        }
        finally{
            state.loading = false
            state.connection = true
        }
    }
    const GetChat = async (user, token, page) => {
        try{
            state.chat = await LunnaIAService.GetLunnaChat(user, token, page)
        }
        catch(error){
            state.error = error
        }
        finally{
            state.loading = false
            state.connection = true
        }
    }

    const chatorder = computed(() =>{
        if(state.chat.results){
            return state.chat.results.sort((a, b) => a.id - b.id)
        }
    })


    return { CreateAnswer, GetChat, chatorder, state }
})