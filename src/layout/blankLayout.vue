<script setup>
import { RouterView } from 'vue-router';
import {useLoginStore} from '@/stores'
const loginStore = useLoginStore()
</script>
<template>
   
        <section class="w-dvw h-dvh" >
            <HeaderGlobal v-if="loginStore.access"  />
            <RouterView class="min-h-full" />
        </section>
   
</template>

