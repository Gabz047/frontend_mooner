import api from "@/plugins/api";

export default class HistoryService{
    async CreateHistory(user, token, song){
        const response = await api.post('history/', {usuario: user, song: song}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.results
    }
    async GetHistory(user, token){
        const {data} = await api.get(`history/?usuario=${user}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.results
    } 
    async FilterHistory(user, token, link){
        const { data } = await api.get(`history/?usuario=${user}` + link, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return data.results
    }
    async DeleteHistory(id, token){
        const response = await api.delete(`history/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.status
    }
}