import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { ArtistService } from '@/services'
import { aboutvalidation } from '@/utils/validations/artist/aboutvalidation'
import { artistnamevalidation } from '@/utils/validations/artist/artisticnamevalidation'
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
export const useArtistStore = defineStore('artist', () => {
  const state = reactive({
    artists: [],
    selectedArtist: {},
    artistsByName: [],
    loading: false,
    error: null,
    connection: false
  })

  const msg = ref(null)
  const err = ref(false)

  const artists = computed(() => state.artists)
  const artistsByName = computed(() => state.artistsByName)
  const selectedArtist = computed(() => state.selectedArtist)
  const isLoading = computed(() => state.loading)


  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getArtists = async (token) => {
    state.loading = true
    try {
      state.artists = await ArtistService.getArtists(token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  /**
  * Fetches organs data.
  * @async
  * @function getOrgansBySystem
  */
  const getArtistsByName = async (name, token) => {
    state.loading = true
    try {
      const response = await ArtistService.getArtistsByName(name, token)
      state.artistsByName = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  /**
   * Creates a new organ.
   * @async
   * @function createSpecie
   * @param {Object} newSpecie - The new organ object to create.
   */
  const createArtist = async (newartist, token) => {
    state.loading = true
    try {
      if (artistnamevalidation.value !== true && aboutvalidation.value !== true) {
        err.value = true
        msg.value = 'preencha os campos obrigatórios'
      }
      else if (artistnamevalidation.value !== true) {
        err.value = true
        msg.value = aboutvalidation.value
      }
      else if (aboutvalidation.value !== true) {
        err.value = true
        msg.value = aboutvalidation.value
      }
      else {
        msg.value = 'verifique seu email'
        err.value = false
        state.artists.push(await ArtistService.createArtist(newartist, token))
      }
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  /**
   * Updates an existing organ.
   * @async
   * @function updateSpecie
   * @param {Object} specie - The organ object to update.
   */


  return {
    state,
    isLoading,
    artists,
    artistsByName,
    msg,
    err,
    selectedArtist,
    getArtists,
    getArtistsByName,
    createArtist,
  }
})