<script setup>
    import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
    import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
    import RealizeSong from './RealizeSong.vue';
    import RealizeAlbum from './RealizeAlbum.vue';
    import { useArtistProgress, useSongsStore } from '@/stores';

    const songStore = useSongsStore()
    const ArtistProgressStore = useArtistProgress()

    function selectSection(i, page){
        ArtistProgressStore.state.Select_song_option.forEach((obj, index) =>{
            obj.active = index === i
        })
    }
    defineProps({
        fields: {
            type: Array,
            required: true
        }
    })
</script>
<template>
<div class="flex w-full flex-col">
    <h1 class="text-center text-4xl text-white font-extralight">Lance sua nova obra!</h1>
    <h2 class="text-center text-base text-white font-extralight">Sera uma musica ou album?</h2>
    <ContainerNavigateButtons class="p-5">
        <NavigateHomeButtons :has_active_bg="true" v-for="item, index in ArtistProgressStore.state.Select_song_option" :key="index" :title="item.title"
            :active="item.active" @goSection="selectSection(index, data_page)" />
    </ContainerNavigateButtons>
    <RealizeSong :fields="fields" :msg="songStore.msg" :err="songStore.err" :create_song_function="songStore.CreateNewSong" v-if="ArtistProgressStore.state.Select_song_option[0].active"/>
    <RealizeAlbum :fields="fields"  v-if="ArtistProgressStore.state.Select_song_option[1].active"/>
</div>
</template>