import api from "@/plugins/api";

export default class AlbumService{
    async CreateAlbum(token,album){
        const {data} = api.post('albuns/', album, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return data
    }
}