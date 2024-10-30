import { DocumentService } from "@/services"
import { defineStore } from "pinia"
import { useLoginStore } from "../user/login"
const documentService = new DocumentService()

export const useDocumentStore = defineStore('document', ()=>{
    const LoginStore = useLoginStore()
    async function CreateNewDoc(file){
       const key = await documentService.CreateDocument(file, LoginStore.access)
       return key
    }

    return { CreateNewDoc }
})