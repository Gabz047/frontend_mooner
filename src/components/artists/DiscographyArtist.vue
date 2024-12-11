<script setup>
    import MusicBox from '../global/MusicBox.vue';
    defineProps({
        discography: {
            type: Array,
            required: true
        }
    })
</script>
<template>
    <div class="flex justify-between items-center p-5 text-white">
        <h1 class="text-3xl font-bold">Discografia</h1>
        <p class="text-xl font-semibold">Vizualizações</p>
        <p class="text-xl font-semibold">Lançamento</p>
      </div>
      <div v-for="song in discography" class="flex justify-between p-2 ms-4 me-4" :key="song.id">
        <div class="flex gap-3">
          <MusicBox :music_data="song" />
        </div>
        <div class="me-32">
          <p class="text-white">{{ song.reproductions }}</p>
        </div>
        <p class="text-white me-3">{{ song.date_realized }}</p>
    </div>
</template>