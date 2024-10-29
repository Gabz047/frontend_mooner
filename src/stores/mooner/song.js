import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { SongService } from '@/services'

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
export const useSongStore = defineStore('song', () => {
  const state = reactive({
    songs: [],
    selectedSong: {},
    songsByTitle: [],
    loading: false,
    error: null,
    connection: false
  })
  const songs = computed(() => state.songs)
  const songsByTitle = computed(() => state.songsByTitle)
  const selectedSong = computed(()=> state.selectedSong)
  const isLoading = computed(() => state.loading)
  const songsCount = computed(() => state.songs.length)

  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getSongs = async (token) => {
    state.loading = true
    try {
      state.songs = await SongService.getSong(token)
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
   const getSongsByName = async (name,token) => {
    state.loading = true
    try {
      const response = await SongService.getSongByName(name,token)  
      state.songsByTitle = response
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
  const createSong = async (newSong, token) => {
    state.loading = true
    try {
      state.songs.push(await SongService.createSong(newSong, token))
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
  const updateOrgan = async (organ) => {
    state.loading = true
    try {
      const index = state.organs.findIndex((s) => s.id === organ.id)
      state.organs[index] = await OrganService.getOrgans()
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }
  /**
   * Deletes a organ.
   * @async
   * @function deleteSpecie
   * @param {number} id - The ID of the organ to delete.
   */
  const deleteOrgan = async (id) => {
    state.loading = true
    try {
      const index = state.organs.findIndex((s) => s.id === id)
      state.organs.splice(index, 1)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    songsCount,
    songs,
    songsByTitle,
    selectedSong,
    getSongs,
    getSongsByName,
    createSong,
    updateOrgan,
    deleteOrgan
  }
})