<script setup>
import { useHistoryStore, useLoginStore } from '@/stores';
import MusicBox from '../global/MusicBox.vue';
import HistoryMusicBox from './HistoryMusicBox.vue';
const storeUser = useLoginStore()
const storeHistory = useHistoryStore()
    const props = defineProps({
        date:{
            type: Date,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        song: {
            type: Object,
            required: true
        },
        is_history:{
            type: Boolean,
            required: true
        }
    })

    function deletesong(){
        storeHistory.DeleteSongHistory(props.id, storeUser.access)
    }
</script>
<template>
    <div class="">
        <MusicBox :music_data="song" v-if="is_history" />
        <HistoryMusicBox :history="song"  @deletesong="deletesong" v-else/>
    </div>
</template>