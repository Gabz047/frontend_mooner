<script setup>
import { SideHeader, GlobalHeader, MusicGlobalContainer, ContainerSliderSong, MusicBoxCard, CarroselContainer } from '@/components';
import { useSongStore } from '@/stores';
import { dataHeader } from '@/utils/header/header';

const songStore = useSongStore()
</script>
<template>
    
    <SideHeader :data="dataHeader" />
    <main class="w-[80%] absolute right-0 mt-4">
    <GlobalHeader />
    <CarroselContainer :data="songStore.songs" />
    <ContainerSliderSong>
        <MusicBoxCard class="mt-3" v-for="song in songStore.songs" :data="song" />
    </ContainerSliderSong>
    
    </main>
</template>