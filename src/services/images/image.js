import api from "@/plugins/api";

export default class ImageService{
    async CreateImage(file, token){
        const {data} = await api.post('images/', {file: file}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'multipart/form-data'
            }
        })

        return data.attachment_key
    }

    async GetImageByAttachment_key(image, token){
        const {data} = await api.get(`/images/?attachment_key=${image}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'multipart/form-data'
            }
        })

        return data.results
    }
}