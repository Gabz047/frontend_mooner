import api from "@/plugins/api";

class PaymentMethodService{
    async CreatePayment(payload, token, email){
        const response = await api.post(`payment/${email}/`, payload, {headers: {Authorization: `Bearer ${token}`}})
        return response
    }
}

export default new PaymentMethodService 