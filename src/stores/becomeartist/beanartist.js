import { defineStore } from "pinia"
import { useArtistProgress } from "./beartistprogress"
import { reactive, ref } from "vue"
import { artistnamevalidation } from "@/utils/validations/artist/artisticnamevalidation"
import { aboutvalidation } from "@/utils/validations/artist/aboutvalidation"
import { ArtistService } from "@/services"

/**
 * Store for managing organs data.
 * @typedef {Object} SpecieStore
 * @property {Object} state - The state object containing organs data.
 * @property {Array} state.species - The array of organs.
 * @property {Object|null} state.selectedSpecie - The currently selected organ.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} speciesCount - Computed property indicating the number of organs.
 * @property {Function} getSpecies - Function to fetch organs data.
 * @property {Function} createSpecie - Function to create a new specie.
 * @property {Function} updateSpecie - Function to update an existing organ.
 * @property {Function} deleteSpecie - Function to delete a organ.
 */

/**
 * Creates a new instance of the OrganStore.
 * @function useSpecieStore
 * @returns {SpecieStore} The OrganStore instance.
 */

export const useBeArtistStore = defineStore('beartist', () =>{
    const ArtistProgressStore = useArtistProgress()

    const state = reactive({
        artists: [],
        loading: false,
        error: null,
        connection: false
    })
    
    const newartist = reactive({
        user: null,
        artistic_name: null,
        instagram: null,
        twitter: null,
        youtube: null,
        about: null
    })

    const msg = ref(null)
    const err = ref(false)

    const createArtist = async (token) =>{
        state.loading = true
        try{
            if(artistnamevalidation.value !== true && aboutvalidation.value !== true){
                err.value = true
                msg.value = 'preencha os campos obrigatórios'
            }
            else if(artistnamevalidation.value !== true){
                err.value = true
                msg.value = aboutvalidation.value
            }
            else if(aboutvalidation.value !== true){
                err.value = true
                msg.value = aboutvalidation.value
            }
            else{
                newartist.user = loginstore.state.user.email
                newartist.artistic_name = ArtistProgressStore.state.progress_artist_fields[0].value
                newartist.instagram = ArtistProgressStore.state.progress_artist_fields[1].value
                newartist.twitter = ArtistProgressStore.state.progress_artist_fields[2].value
                newartist.youtube = ArtistProgressStore.state.progress_artist_fields[3].value
                newartist.about = ArtistProgressStore.state.progress_artist_fields[4].value
                msg.value = 'verifique seu email'
                err.value = false
                await ArtistService.createArtist(newartist, loginstore.access)
            }
        }
        catch(error){
            state.error = error
        }
        finally{
            state.loading = false
            state.connection = true
        }
    }
    return { createArtist, msg, err }
})