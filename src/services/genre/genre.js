import api from "@/plugins/api";

 
class GenreService{
    async GetGenre(token){
        const { data } = await api.get('genre/')
        return data.results
    }
}

export default new GenreService()