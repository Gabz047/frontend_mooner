import api from "@/plugins/api";

export default class DocumentService{
    async CreateDocument(file, token){
        const {data} = await api.post('documents/', {file: file}, {
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": 'multipart/form-data'
            }
        })

        return data.attachment_key
    }
}