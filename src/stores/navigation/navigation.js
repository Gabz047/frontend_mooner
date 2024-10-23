import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useNavigationStore = defineStore('navigation', () => {
    const state = reactive({
        addPlaylistPop: false,
        addCommunity: false
    })

    const addPlaylistPop = computed(()=> state.addPlaylistPop)

    const addCommunity = computed(()=> state.addCommunity)

    return {
        state,
        addPlaylistPop,
        addCommunity
    }
})