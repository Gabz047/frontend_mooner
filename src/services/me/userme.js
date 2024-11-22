import api from "@/plugins/api";

class UserMeService{

    async getUsers(token) {
        try {
            const {data} = await api.get(`/usuarios`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getUsers', error);
            throw error;
        }
    }
    
    async getUser(token) {
        try {
            const {data} = await api.get(`/usuarios/me`, {headers: {'authorization': `Bearer ${token}`}});
        return data
        
        } catch (error) {
            console.log('Error in getUser', error);
            throw error;
        }
    }
}


export default new UserMeService()