import { defineStore } from "pinia"
import { signupinputs } from "@/utils/inputs/signup"
import { emailvalidation } from "@/utils/validations/auth/email_validation"
import { passwordvalidation } from "@/utils/validations/auth/password_validation"
import { ref } from "vue"
import { SignUpService } from "@/services"
const signupervice = new SignUpService()

export const useSignUpStore = defineStore('signup', () =>{
    const newuser = {
        email: '',
        password: ''
    }
    
    const msg = ref(null)
    const err = ref(false)
    
    async function CreateUser(){
        if(!signupinputs.value[0].value && !signupinputs.value[1].value && !signupinputs.value[2].value){
            err.value = true
            msg.value = 'preencha os campos, para a criação da sua conta'
        }
        else if(emailvalidation.value !== true){
            err.value = true
            msg.value = emailvalidation.value
        }
        else if(passwordvalidation.value !== true){
            err.value = true
            msg.value = passwordvalidation.value
        }
        else{
            newuser.email = signupinputs.value[0].value
            newuser.password = signupinputs.value[1].value
            await signupervice.CreateNewUser(newuser)
            err.value = false
            msg.value = 'usuario criado com sucesso'
        }
    }

    return { CreateUser, msg, err }
})