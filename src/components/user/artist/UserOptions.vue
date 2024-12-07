<script setup>
import { useLoginStore, useUserStore, useArtistStore } from '@/stores';
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

    const LoginStore = useLoginStore()
    const userStore = useUserStore()
    const router = useRouter()
    const artistStore = useArtistStore()

    defineProps({
        is_premium: {
            type: Boolean,
            required: true,
            default: false
        },
        is_artist:{
            type: Boolean,
            required: true
        }, 
        logout: {
            type: Function,
            required: true
        }
    })

    onMounted(()=>{
        console.log(LoginStore.user)
    })

</script>
<template>
    <div>
        <div class="flex flex-col">
            <RouterLink to="/user" class="flex flex-col h-[35px] w-full duration-200 active">
                <div class=" font-extralight flex gap-2 items-center">
                <i class="mdi mdi-account-outline"></i>Perfil
                </div>
            <div class="option"></div>
            </RouterLink>

            <RouterLink class="flex flex-col h-[35px] w-full duration-200 active" :to="LoginStore.user.is_artist ? '/artistpainel': '/beanartist' ">
                <div class=" font-extralight flex gap-2 items-center">
                    <i class="mdi mdi-star-outline"></i>{{ LoginStore.user.is_artist ? 'Painel de Artista' : 'Seja um artista'}}
                </div>
            <div class="option"></div>
            </RouterLink>

            <RouterLink class="flex flex-col h-[35px] w-full duration-200 active" v-if="!is_premium" to="/plans">
                <div class=" font-extralight flex gap-2 items-center">
                    <i class="mdi mdi-diamond-stone"></i>Seja Premium
                </div>
            <div class="option"></div>
            </RouterLink>

            <div class="flex flex-col h-[35px] w-full duration-200 active">
                <p   @click="logout" class="cursor-pointer flex items-center gap-2 w-full"><i class="mdi mdi-logout"></i>Encerrar sessão</p>
            <div class="option"></div>
            </div>

    
        </div>
    </div>
</template>
<style scoped>
    a, p{
        font-weight: 200;
    }
    
    .mdi-star-outline, .mdi-account-outline, .mdi-logout{
        font-size: 20px;
    }

    .active {
        padding: 2px;
    }

    .option {
        width: 0px;
        height: 1.5px;
        transition: 0.4s;
        background-color: white;
        
    }

    .active:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 5px 5px 0px 0px;
    }

   .active:hover .option {
    width: 100%;
    background-color: white;
   }
</style>