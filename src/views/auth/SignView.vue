<script setup>
    import AuthComp from '@/components/auth/AuthComp.vue';
    import { signupinputs } from '@/utils/inputs/signup';
    import { useSignUpStore } from '@/stores/user/signup';
    import MsgGlobal from '@/components/global/MsgGlobal.vue';
import router from '@/router';
    const store = useSignUpStore()
    const pageinfo = {
        btn_id: 'btn-login',
        subtitle_session: "Aproveite a sensação de navegar pelo melhor app de musica",
        title_session: "Crie a sua conta",
        title_content: "Registrar",
        btn_title: 'Registrar-se',
        links: {
            link1: '/password',
            link2: '/login'
        },
        link1_title: "dúvidas",
        link2_title: "já possuo uma conta",
        is_login_page: false,
    }
    function gotologin(is_created){
        if(!is_created){
            store.msg = ''
            router.push('/login')
        }
        else{
            store.msg.value = ''
        }
    }
</script>
<template>
    <MsgGlobal v-show="store.msg" :err="store.err" :msg="store.msg" @confirm="gotologin"></MsgGlobal>
    <AuthComp :inputs_page="signupinputs" :info_page="pageinfo" :action_btn="store.CreateUser"/>
</template>