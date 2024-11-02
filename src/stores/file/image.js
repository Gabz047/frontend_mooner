import { defineStore } from "pinia"
import { ImageService } from "@/services"
import { useStorage } from "@vueuse/core"
const imageService = new ImageService()

export const useImgStore = defineStore('image', ()=>{
    const state = useStorage('imgstorage', {
        file: null,
    })

    async function CreateNewImg(file, token){
        state.value.file = file
        const key = await imageService.CreateImage(file, token)
        return key
    }

    return { CreateNewImg }
})
