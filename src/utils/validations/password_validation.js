import { computed } from "vue";
import { signupinputs } from "../inputs/signup";
export const passwordvalidation = computed(() =>{
    if(!signupinputs.value[1].value){
        return 'senha indefinida !!!<br>dica: preencha seu campo de senha'
    }
    else if(!signupinputs.value[1].value.match(/\d/)){
        return 'senha inválida !!!<br>dica: sua senha deve conter numeros'
    }
    else if(signupinputs.value[1].value.length < 8 || signupinputs.value[1].value.length > 25){
        return 'senha inválida !!!<br>dica: sua senha deve conter 8 a 25 caracteres'
    }
    else if(signupinputs.value[1].value !== signupinputs.value[2].value|| signupinputs.value[2].value !== signupinputs.value[1].value){
        return 'credenciais não são iguais !!!<br>dica: sua senha deve ser igual a sua confirmação'
    }
    return true
})