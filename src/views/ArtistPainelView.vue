<script setup>
    import ArtistPainel from '@/components/user/artist/ArtistPainel.vue';
    import { useArtistProgress, useLoginStore } from '@/stores';
    const ArtistProgressStore = useArtistProgress()
</script>
<template>
<div class="p-10">
    <ArtistPainel :fields="ArtistProgressStore.state.artist_create_song_fields" />
</div>
</template>