import api from "@/plugins/api";

export default class UserMeService{
    async GetMe(token){
        const {data} = await api.get('usuarios/me', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return data
    }
}