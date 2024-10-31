<script setup>
import { RouterView } from 'vue-router'
import HeaderGlobal from './components/global/HeaderGlobal.vue';
import { useLoginStore } from './stores/user/login';
const store = useLoginStore()


</script>
<template>
  <HeaderGlobal v-show="store.state.access"/>
  <RouterView />
</template>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    
  }
</style>

