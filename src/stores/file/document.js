import { DocumentService } from "@/services"
import { defineStore } from "pinia"
const documentService = new DocumentService()

export const useDocumentStore = defineStore('document', ()=>{
    async function CreateNewDoc(file, token){
       const key = await documentService.CreateDocument(file, token)
       return key
    }

    return { CreateNewDoc }
})