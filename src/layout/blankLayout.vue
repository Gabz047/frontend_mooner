<script setup>
import { RouterView } from 'vue-router';
import {useLoginStore} from '@/stores'
import HeaderGlobal from '@/components/global/HeaderGlobal.vue';
const loginStore = useLoginStore()
</script>
<template>
<HeaderGlobal v-if="loginStore.access"  :is_blink_layout="true"/>
<RouterView class="min-h-full" />
</template>

