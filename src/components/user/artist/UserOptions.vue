<script setup>
import { useArtistProgress } from '@/stores';
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
            <RouterLink :to=" useArtistProgress().state.progress_artist[2].is_activate ? '/artistpainel': 'beanartist' "><i class="mdi mdi-star-outline"></i>{{ useArtistProgress().state.progress_artist[2].is_activate ? 'Painel de Artista' : 'Seja um artista'}}</RouterLink>
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