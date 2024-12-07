<script setup>
import SearchBar from './SearchBar.vue';
import { useUserStore } from '@/stores';
import { UserPerfil } from '@/components';
import { shallowRef } from 'vue';
const userStore = useUserStore()

</script>

<template>
    <section class="w-full flex justify-between h-[47px] items-center">
      <SearchBar />
      <div class="flex text-white gap-2 mr-2">
        <UserPerfil :data="userStore.myuser" />
        
        <div class="flex gap-2 lg:hidden">
        <span class="mdi mdi-account-multiple text-2xl rounded-full h-[50px] w-[50px] bg-[#151515] flex items-center justify-center"></span>
        <span class="mdi mdi-cog text-2xl rounded-full h-[50px] w-[50px] bg-[#151515] flex items-center justify-center"></span>
        </div>
      </div>
      
    </section>

</template>
