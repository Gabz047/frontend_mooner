import api from "@/plugins/api"

class RecomendationService{
    async getRecomendation(user){
        const {data} = await api.get(`recomendations/${user}/`)
        return data.recommended_songs
    }
}

export default new RecomendationService()