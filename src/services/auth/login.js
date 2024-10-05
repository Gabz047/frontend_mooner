import api from "@/plugins/api";

export default class LoginService{
    async GetToken(user){
        try{
            const response = await api.post('token/', user)
            return response.data
        }
        catch(err){
            return false
        }
    }
}