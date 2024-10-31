import { defineStore } from "pinia"
import { useLoginStore } from "../user/login"
import { ImageService } from "@/services"
import { useStorage } from "@vueuse/core"
const LoginStore = useLoginStore()
const imageService = new ImageService()

export const useImgStore = defineStore('image', ()=>{
    const state = useStorage('imgstorage', {
        file: null,
    })
    
    async function CreateNewImg(file){
        state.value.file = file
        const key = await imageService.CreateImage(file, LoginStore.access)
        return key
    }

    return { CreateNewImg }
})