import api from "@/plugins/api";
export default class ArtistService{
    async CreateNewArtist(newartist, token){
        const response = await api.post('artists/', newartist, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        return response
    }
}