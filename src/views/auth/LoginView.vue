<script setup>
    import AuthComp from '@/components/auth/AuthComp.vue';
    import { logininputs } from '@/utils/inputs/login';
    import { useLoginStore } from '@/stores/user/login';
    import MsgGlobal from '@/components/global/MsgGlobal.vue';
import router from '@/router';
    const store = useLoginStore()

    function gotohome(is_logged){
        if(!is_logged){
            store.msg = ''
            router.push('/')
        }
        else{
            store.msg = ''
        }
    }
</script>
<template>
    <MsgGlobal v-show="store.msg" :err="store.err" :msg="store.msg" @confirm="gotohome"/>
    <AuthComp :is_login_page="true"  :inputs_page="logininputs" :action_btn="store.DoLogin" />
</template>