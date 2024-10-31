import api from "@/plugins/api";

export default class SongsService{
    async CreateNewSong(song, token){
        const response = await api.post('song/', song, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response
    }
}