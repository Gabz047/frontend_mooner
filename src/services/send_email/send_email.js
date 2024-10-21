import api from "@/plugins/api";
export default class SendEmailService{
    async send_email_to_be_an_artist(email){
        const response = await api.post('artists/', {user: email})
        return response
    }
}