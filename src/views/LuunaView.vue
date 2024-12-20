<script setup>
import LunaIA from '@/components/layout/header/LunaIA.vue'
import { dataHeader } from '@/utils/header/header';
import { SideHeader, GlobalHeader } from '@/components';
</script>
<template>
<SideHeader :data="dataHeader" />
<main class="w-[80%] flex justify-center lg:w-full absolute right-0 mt-4 pt-[65px] pb-[60px]">
    <GlobalHeader />
    <LunaIA />
</main>
</template>