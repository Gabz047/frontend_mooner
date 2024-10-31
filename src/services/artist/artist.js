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
    async GetArtists(token, search){
        const {data} = await api.get(`artists/?artistic_name=${search}`,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        return data.results
    }
}