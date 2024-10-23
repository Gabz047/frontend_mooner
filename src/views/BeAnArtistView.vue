<script setup>
    import BeArtistProcess from '@/components/user/artist/BeArtistProcess.vue';
    import BeArtistActions from '@/components/user/artist/BeArtistActions.vue';
    import { useArtistProgress } from '@/stores';

    const StoreProgressArtist = useArtistProgress()
   
</script>
<template>
    <div :class="!StoreProgressArtist.state.progress_artist[0].is_activate ? 'container-artist-creation' : StoreProgressArtist.state.progress_artist[1].is_activate && StoreProgressArtist.state.progress_artist[0].is_activate  ? 'container-song-creation' : 'container-email-verify'">
        <BeArtistActions :fields="!StoreProgressArtist.state.progress_artist[0].is_activate ? StoreProgressArtist.state.progress_artist_fields : StoreProgressArtist.state.artist_create_song_fields" :page_activated="StoreProgressArtist.state.progress_artist"/>
        <BeArtistProcess :progress="StoreProgressArtist.state.progress_artist"/>
    </div>
</template>
<style scoped> 
    .container-email-verify{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 89.9vh;
    }
    .container-song-creation{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 170vh;
    }
    .container-artist-creation{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 200vh;
    }
</style>