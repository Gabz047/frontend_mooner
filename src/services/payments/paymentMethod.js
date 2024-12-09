import api from "@/plugins/api";

class PaymentMethodService{
    async CreatePayment(payload, token, email){
        const response = await api.post(`payment/${email}/`, payload, {headers: {Authorization: `Bearer ${token}`}})
        return response
    }
    async GetQrCode(token){
        const {data} = await api.post(`qrcode/`, {headers: {Authorization: `Bearer ${token}`}})
        return data
    }
    async getStatus(id, email, name){
        const response = await api.get(`payment/status/${id}/${name}/${email}/`)
        return response
    }
}

export default new PaymentMethodService()