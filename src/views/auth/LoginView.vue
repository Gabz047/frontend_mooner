<script setup>
    import AuthComp from '@/components/auth/AuthComp.vue';
    import { logininputs } from '@/utils/inputs/login';
    import { useLoginStore } from '@/stores/user/login';
    import MsgGlobal from '@/components/global/MsgGlobal.vue';
    const store = useLoginStore()
    const pageinfo = {
        btn_id: 'btn-login',
        subtitle_session: "Entregando qualidade dentro e fora de orbita",
        title_session: "Bem Vindo ao Mooner",
        title_content: "Iniciar Sessão",
        btn_title: 'Iniciar Sessão',
        links: {
            link1: '/password',
            link2: '/sign-up'
        },
        link1_title: "esqueci minha senha",
        link2_title: "ainda não possuo uma conta",
        is_login_page: true
    }


</script>
<template>
    <MsgGlobal v-show="store.msg" :err="store.err" :msg="store.msg" @confirm="store.msg = ''"/>
    <AuthComp :info_page="pageinfo" :inputs_page="logininputs" :action_btn="store.DoLogin" />
</template>