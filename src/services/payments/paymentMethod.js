import api from "@/plugins/api";

class PaymentMethodService{
    async CreatePayment(payload, token){
        const response = await api.post('payment/', payload, {headers: {Authorization: `Bearer ${token}`}})
        return response
    }
}

export default new PaymentMethodService 