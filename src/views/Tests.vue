<script setup>
import { SideHeader, GlobalHeader } from '@/components';
import { dataHeader } from '@/utils/header/header';
</script>
<template>
    
    <SideHeader :data="dataHeader" />
    <main class="w-[80%] absolute right-0 mt-4">
    <GlobalHeader />
    </main>
</template>