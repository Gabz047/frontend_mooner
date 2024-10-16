<script setup>
    import { UserLinks } from '@/utils/user/userlinks';
</script>
<template>
    <div>
        <div v-for="links, index in UserLinks" :key="index" >
            <RouterLink :to="links.link"><i :class="links.icon"></i> {{links.name}} </RouterLink>
        </div>
    </div>
</template>
<style scoped>
    a{
        font-weight: 200;
    }
    
    .mdi-star-outline, .mdi-account-outline, .mdi-logout{
        font-size: 20px;
    }
</style>