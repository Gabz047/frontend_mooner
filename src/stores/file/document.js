import { DocumentService } from "@/services"
import { defineStore } from "pinia"
import { useLoginStore } from "../user/login"
const documentService = new DocumentService()
const LoginStore = useLoginStore()
export const useDocumentStore = defineStore('document', ()=>{

    async function CreateNewDoc(file){
       const key = await documentService.CreateDocument(file, LoginStore.access)
       return key
    }

    return { CreateNewDoc }
})