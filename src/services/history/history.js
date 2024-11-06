import api from "@/plugins/api";

class HistoryService{
    async CreateHistory(user, token, song){
        try{
            const response = await api.post('history/', {usuario: user, song: song}, {headers: {Authorization: `Bearer ${token}`}})
            return response
        }
        catch(error){
            console.log('Error on CreateHistory', error)
            throw error
        }
    }
    async GetHistory(user, token){
        try{
            const {data} = await api.get(`history/?usuario__email=${user}`,{headers: {Authorization: `Bearer ${token}`}})
            return data.results
        }
        catch(error){
            console.log('Error on GetHistory', error)
            throw error
        }
        
    } 
    async FilterHistory(user, token, search){
        try{
            const { data } = await api.get(`history/?usuario__email=${user}&search=${search}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            return data.results
        }
        catch(error){
            console.log('Error on filter History')
            throw error
        }
    }
    async DeleteHistory(id, token){
        try{
            const {data} = await api.delete(`history/${id}/`, {headers: {Authorization: `Bearer ${token}`}})
            return data
        }
        catch(error){
            console.log('Error on DeleteHistory', error)
            throw error
        }
        
    }
    async DeleteAllHistory(user, token){
        try{
            const { data } = await api.delete(`history/destroy/?usuario__email=${user}`, {headers:{Authorization: `Bearer ${token}`}})
            return data
        }
        catch(error){
            console.log('Error on DeleteAllHistory', error)
        }
    }
}

export default new HistoryService()