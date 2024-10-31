import api from "@/plugins/api";

export default class SearchService{
    async GetResults(token, usersearch){
        const { data } = await api.get(`song/?search=${usersearch}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return data.results
    }
}