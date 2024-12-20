import api from "@/plugins/api";

export default class SignUpService{
    async CreateNewUser(user){
        try{
            const response = await api.post('usuarios/', user)
            return response
        }
        catch(err){
            throw err
        }
    }
}