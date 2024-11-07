<script setup>
import { useLoginStore } from '@/stores';

    const LoginStore = useLoginStore()
    defineProps({
        logout: {
            type: Function,
            required: true
        }
    })
</script>
<template>
    <div>
        <div class="flex flex-col ">
            <RouterLink to="/user"><i class="mdi mdi-account-outline"></i>Perfil</RouterLink>
            <RouterLink :to="LoginStore.user.is_artist ? '/artistpainel': '/beanartist' "><i class="mdi mdi-star-outline"></i>{{ LoginStore.user.is_artist ? 'Painel de Artista' : 'Seja um artista'}}</RouterLink>
            <p @click="logout"><i class="mdi mdi-logout" ></i>Encerrar sessão</p>
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
</style>