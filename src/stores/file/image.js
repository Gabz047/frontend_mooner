import { defineStore } from "pinia"
import { useLoginStore } from "../user/login"
import { ImageService } from "@/services"
const imageService = new ImageService()

export const useImgStore = defineStore('image', ()=>{
    const LoginStore = useLoginStore()
    async function CreateNewImg(file){
        const key = await imageService.CreateImage(file, LoginStore.access)
        return key
    }

    return { CreateNewImg }
})