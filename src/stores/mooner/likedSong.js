import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { LikedSongService } from '@/services'

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
export const useLikedSongStore = defineStore('likedSong', () => {
  const state = reactive({
    likedSongs: [],
    likedSongsByUser: [],
    likedSongsBySong: [],
    selectedLikedSong: {},
    loading: false,
    error: null,
    connection: false
  })
  const likedSongs = computed(() => state.likedSongs)
  const likedSongsByUser = computed(() => state.likedSongsByUser)
  const likedSongsBySong = computed(() => state.likedSongsBySong)
  const selectedLikedSong = computed(()=> state.selectedLikedSong)


  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getLikedSongs = async (token) => {
    state.loading = true
    try {
      state.likedSongs = await LikedSongService.getLikedSongs(token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getLikedSongsByUser = async (user,token) => {
    state.loading = true
    try {
      state.likedSongsByUser = await LikedSongService.getLikedSongsByUser(user, token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }
  
  const getLikedSongsBySong = async (song,token) => {
    state.loading = true
    try {
      state.likedSongsBySong = await LikedSongService.getLikedSongsBySong(user, token)
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
   
  /**
   * Creates a new organ.
   * @async
   * @function createSpecie
   * @param {Object} newSpecie - The new organ object to create.
   */
  const createLikedSong = async (newLikedSong, token) => {
    state.loading = true
    try {
      state.likedSongs.push(await LikedSongService.createLikedSong(newLikedSong, token))
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const deleteLikedSong = async (id) => {
    state.loading = true
    try {
      const index = state.likedSongs.findIndex((s) => s.id === id)
      state.likedSongs.splice(index, 1)
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
    likedSongs,
    likedSongsByUser,
    likedSongsBySong,
    selectedLikedSong,
    getLikedSongs,
    getLikedSongsByUser,
    getLikedSongsBySong,
    createLikedSong,
    deleteLikedSong
  }
})