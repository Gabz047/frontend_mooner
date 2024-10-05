import { computed } from "vue";
import { signupinputs } from "../inputs/signup";

export const emailvalidation = computed(() =>{
    if(!signupinputs.value[0].value){
        return 'email inválido !!!<br>dica: preencha o campo de email'
    }
    else if(!signupinputs.value[0].value.includes('@' && '.com')){
        return 'email inválido !!!<br>dica: seu email deve conter @ e .com' 
    }
    return true
})