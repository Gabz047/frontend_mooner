<script setup>
import BeArtistForm from './BeArtistForm.vue';
import ArtistPainel from './ArtistPainel.vue';
import VerifyEmail from './VerifyEmail.vue'

defineProps({
    page_activated: {
        type: Array,
        required: true
    },
    fields: {
        type: Array,
        required: true
    }
})

</script>
<template>
    <div class="w-full flex justify-center items-center">
        <BeArtistForm :fields_input="fields" v-if="!page_activated[0].is_activate"/>
        <VerifyEmail v-else-if="page_activated[0].is_activate && !page_activated[1].is_activate"/>
        <ArtistPainel :fields="fields" v-else/>
    </div>
</template>