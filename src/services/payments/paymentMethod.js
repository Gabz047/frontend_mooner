import api from "@/plugins/api";

export default class PaymentMethodService{
    async CreatePayment(payload){
        const response = await api.post('payment/', payload)
        return response
    }
}