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

    async GetMeArtist(email, token){
        try {
            const { data } = await api.get(`/artists`, {headers: {'authorization': `Bearer ${token}`}});
            const ArtistMe = data.results.find((user) => user.user.email === email)
            return ArtistMe;
        } catch (error) {
            console.log("Service: GetArtists - return error", error);
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