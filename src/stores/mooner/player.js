import { defineStore } from 'pinia';
import { reactive } from 'vue';


export const usePlayerStore = defineStore('player', () => {
    const state = reactive({
        is_playing: false,
        songPlayer: null,
        songPlayerVisual: null
    })

    const play = () => {
        if (state.songPlayer.readyState === 0) state.songPlayer.load();

        const promise = state.songPlayer.play()

        if (promise !== undefined) {
            promise.then(() => {
                console.log('funfou')
            })
            .catch(error => {
                state.songPlayer.play()
                // state.songPlayerVisual.play()
                console.log('deu pau e não funfou' + error)
            })
        }
        state.is_playing = true

    }

    const pause = () => {
        state.songPlayer.pause()
        // state.songPlayerVisual.pause()
        state.is_playing = false
    }
    const usePlay = () => {
        if (state.is_playing) {
            pause()
        }
        else {
            play()
        }
    }

    return {
        state,
        play,
        pause,
        usePlay,
    }
})