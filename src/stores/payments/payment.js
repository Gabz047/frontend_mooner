import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { plans } from "@/utils/plans/plans"
import { ref } from "vue"
import { PaymentMethodService } from "@/services"
const paymentService = new PaymentMethodService()

export const usePaymentStore = defineStore('payment', ()=>{
    const typeAssign = useStorage('assign', {
        assign: {}
    })
    const msg = ref(null)
    const err = ref(false)
    
    function getAssign(name){
        const findassign = plans.find(assign => assign.name === name)
        typeAssign.value.assign = findassign
        console.log(typeAssign.value.assign)
    }
    async function createPayment(payload){
        const response = await paymentService.CreatePayment(payload)
        
        if(response.status === 200){
            msg.value = response.data.msg
            err.value = false
        }
    }
    
    return { typeAssign, getAssign, createPayment, err, msg }
})