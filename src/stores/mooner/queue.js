import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';


export const useQueueStore = defineStore('queue', () => {
    const state = useStorage('queue', {
        queue: [],
        history: [],
        currentSong: {}
    })
    

    function setCurrentSong(song) {
        if (state.value.currentSong) { 
            addSongToHistory(state.value.currentSong)
        }
        state.value.currentSong = song;
    }

    function addSongToQueue(newSong) {
        state.value.queue.push(newSong);
    }

    function addSongToHistory(song) {
        state.value.history.push(song)
        // Limitando o histórico a 10 músicas
        if (state.value.history.length > 10) {
            state.value.history.shift();
        }
    }


    function nextSong() {
        setCurrentSong(state.value.queue.shift());
    }

    function lastSong() {
        setCurrentSong(state.value.history.pop());
    }

    return {
        state,
        setCurrentSong,
        addSongToQueue,
        addSongToHistory,
        nextSong,
        lastSong
    };
});
