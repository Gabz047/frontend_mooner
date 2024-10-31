import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { UserMeService } from '@/services'

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
export const useUserStore = defineStore('user', () => {
  const state = reactive({
    users: [],
    selectedUser: {},
    myuser: {},
    loading: false,
    error: null,
    connection: false
  })
  const users = computed(() => state.users)
  const myuser = computed(()=> state.myuser)
  const selectedUser = computed(()=> state.selectedUser)
  const isLoading = computed(() => state.loading)
  const usersCount = computed(() => state.songs.length)

  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getUsers = async (token) => {
    state.loading = true
    try {
      state.users = await UserMeService.getUsers(token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getUser = async (token) => {
    state.loading = true
    try {
      state.myuser = await UserMeService.getUser(token)
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
   const getSongByTitle = async (title,token) => {
    state.loading = true
    try {
      const response = await SongService.getSongByTitle(title,token)  
      state.organsBySystem = response
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
    usersCount,
    users,
    myuser,
    selectedUser,
    getUsers,
    getUser,
    updateOrgan,
    deleteOrgan
  }
})