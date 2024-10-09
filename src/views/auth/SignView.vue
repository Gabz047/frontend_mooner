<script setup>
    import AuthComp from '@/components/auth/AuthComp.vue';
    import { signupinputs } from '@/utils/inputs/signup';
    import { useSignUpStore } from '@/stores';
    import MsgGlobal from '@/components/global/MsgGlobal.vue';
    import router from '@/router';
    const store = useSignUpStore()
    function gotologin(is_created){
        if(!is_created){
            store.msg = ''
            router.push('/login')
        }
        else{
            store.msg = ''
        }
    }  
       
</script>
<template>
    <MsgGlobal v-show="store.msg" :err="store.err" :msg="store.msg" @confirm="gotologin"></MsgGlobal>

    <AuthComp :inputs_page="signupinputs" :is_login_page="false" :action_btn="store.CreateUser"/>
</template>