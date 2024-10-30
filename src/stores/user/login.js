import { defineStore } from "pinia";
import { logininputs } from "@/utils/inputs/login";
import { computed, ref } from "vue";
import { LoginService } from "@/services";
import { useStorage } from "@vueuse/core";
const loginservice = new LoginService()

export const useLoginStore = defineStore('login', ()=>{
    const state = useStorage('storage', {
        user: {
            email: '',
            password: ''
        },
        access: '',
        refresh: ''
    })
    const msg = ref(null)
    const err = ref(false)
    const access = computed(() => state.value.access)
    const user = computed(()=> state.value.user)
    
    async function DoLogin(){
        state.value.user.email = logininputs.value[0].value
        state.value.user.password = logininputs.value[1].value
        const token = await loginservice.GetToken(state.value.user)
        if(!token){
            msg.value = 'suas credenciais não foram atingidas, verifique suas credenciais ou crie uma conta'
            err.value = true
        }
        else{
            err.value = false
            msg.value = `logado com sucesso seja muito bem vindo ao Mooner ${logininputs.value[0].value}!`
            state.value.access = token.access
            state.value.refresh = token.refresh
        }
    }

    function AutoLogin(){
        if(state.value.user.email && state.value.user.password){
            DoLogin(state.value.user)
        }
    }
    return { DoLogin, AutoLogin, msg, err, state, access, user }
})