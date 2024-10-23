import api from "@/plugins/api";

export default class GenreService{
    async GetGenre(token){
        const { data } = await api.get('genre/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.results
    }
}