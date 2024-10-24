<script setup>
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import { UserMeService } from '@/services';
import { useArtistProgress, useLoginStore } from '@/stores';
import { onMounted, onUpdated, ref } from 'vue';


const LoginStore = useLoginStore()
const MeService = new UserMeService()
const ArtistProgressStore = useArtistProgress()
function gotoemail(){
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
}

const EmailVerified = ref(false)

onMounted(async () =>{
    const token = LoginStore.access
    while(true){
        const user = await MeService.GetMe(token) 
        if(user.is_artist){
            EmailVerified.value = user.is_artist
            break
        }
    }
})
</script>
<template>
    <div class="flex justify-center flex-col items-center gap-8 text-white">
        <div class="flex items-center gap-4" v-if="!EmailVerified">
            <h1 class="text-xl" >Verifique seu email...</h1>
            <i class="mdi mdi-email text-xl"></i>
        </div>
        <div class="flex items-center gap-4" v-else>
            <h1 class="text-xl">Email Verificado Com sucesso</h1>
            <i class="mdi mdi-check text-xl"></i>
        </div>
        <ButtonGlobal title="Verificar" background="purple" width="150px" border_radius="10px" @click="gotoemail" v-if="!EmailVerified"/>
        <ButtonGlobal title="Prosseguir" background="purple" width="150px" border_radius="10px" @click="ArtistProgressStore.state.progress_artist[1].is_activate = true" v-else/>
    </div>
</template>