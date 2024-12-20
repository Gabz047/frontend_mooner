<script setup>
import { RouterView } from 'vue-router';
import {useLoginStore} from '@/stores'
import HeaderGlobal from '@/components/global/HeaderGlobal.vue';
const loginStore = useLoginStore()
</script>
<template>
<RouterView class="h-dvh" />
</template>

