import { defineStore } from "pinia"
import { ImageService } from "@/services"
import { useStorage } from "@vueuse/core"
import { computed } from "vue"
const imageService = new ImageService()

export const useImgStore = defineStore('image', ()=>{
    const state = useStorage('imgstorage', {
        file: null,
        selectedImage: {}
    })

    const selectedImage = computed(()=>state.value.selectedImage)

    async function CreateNewImg(file, token){
        state.value.file = file
        const key = await imageService.CreateImage(file, token)
        return key
    }

    async function GetImagesByAttachment_key(image, token){
        const newImage = await imageService.GetImageByAttachment_key(image, token)
        console.log('aaa: ', newImage[0])
        state.value.selectedImage = newImage[0]
    }

    return { CreateNewImg, GetImagesByAttachment_key,  state, selectedImage }
})
