import api from "@/plugins/api";

export default class HistoryService{
    async CreateHistory(user, token, song){
        const response = await api.post('history/', {usuario: user.email, song: song}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.results
    }
    async GetHistory(user, token){
        const {data} = await api.get(`history/?usuario=${user.email}`,{
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
    async DeleteAllHistory(user, token){
        const { data } = await api.delete(`history/destroy/?usuario=${user}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return data.results
    }
}