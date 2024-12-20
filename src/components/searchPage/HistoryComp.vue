<script setup>
import { useHistoryStore, useLoginStore } from '@/stores';
import MusicBox from '../global/MusicBox.vue';
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
        },
        history:{
            type: Boolean,
            default: false
        }
    })

    function deletesong(){
        storeHistory.DeleteSongHistory(props.id, storeUser.access)
    }
    
</script>
<template>
    <div class="">
        <MusicBox :is_history="history" :music_data="song" @deletesong="deletesong"/>
    </div>
</template>