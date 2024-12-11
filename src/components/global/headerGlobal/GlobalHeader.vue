<script setup>
import SearchBar from './SearchBar.vue';
import { useUserStore } from '@/stores';
import { UserPerfil } from '@/components';
import { shallowRef } from 'vue';
const userStore = useUserStore()

</script>

<template>
    <section class="w-[80%] lg:bg-transparent lg:backdrop-blur-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-lg py-9 lg:w-[90%] top-0 lg:right-0  flex justify-between h-[47px] items-center fixed z-[9999]">
      <SearchBar />
      <div class="flex text-white gap-2 mr-2">
        <UserPerfil class="z-[999]" :data="userStore.myuser" />
        
        <div class="flex gap-2 lg:hidden">
        <span class="mdi mdi-account-multiple text-2xl rounded-full h-[50px] w-[50px] bg-[#151515] flex items-center justify-center"></span>
        <span class="mdi mdi-cog text-2xl rounded-full h-[50px] w-[50px] bg-[#151515] flex items-center justify-center"></span>
        </div>
      </div>
      
    </section>

</template>
