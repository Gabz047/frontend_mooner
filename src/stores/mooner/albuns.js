import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { AlbumService } from '@/services'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
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

  
export const useAlbumStore = defineStore('album', () => {
  const state = reactive({
    albuns: [],
    albunsByAutor: [],
    albunsBySongs: [],
    albunsBySearch: [],
    selectedAlbum: {},
    loading: false,
    error: null,
    connection: false
  })

  const toLeft = ref(0)
  

  const stateStorage = useStorage('albumstorage', {
    name: '',
    file: '',
    songs: [],
    cover: '',
    albumcreated: false
})

  const msg = ref('')
  const err = ref(false)
  
  const newAlbum = reactive({
    name: stateStorage.value.name,
    autor: '',
    songs: [],
    cover: stateStorage.value.cover
  })
  
  const albuns = computed(() => state.albuns)
  const albunsByAutor = computed(() => state.albunsByAutor)
  const albunsBySongs = computed(() => state.albunsBySongs)
  const albunsBySearch = computed(() => state.albunsBySearch)
  const selectedAlbum = computed(()=> state.selectedAlbum)


  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getAlbuns = async (token) => {
    state.loading = true
    try {
      state.albuns = await AlbumService.getAlbuns(token)
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
   const getAlbunsByAutor = async (autor,token) => {
    state.loading = true
    try {
      const response = await AlbumService.getAlbunsByAutor(autor,token)  
      state.albunsByAutor = response
      console.log(response)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getAlbunsBySongs = async (songs,token) => {
    state.loading = true
    try {
      const response = await AlbumService.getAlbunsBySongs(songs,token)  
      state.albunsBySongs = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getAlbunsBySearch = async (search,token) => {
    state.loading = true
    try {
      const response = await AlbumService.getAlbunsBySearch(search,token)  
      state.albunsBySearch = response
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
  const createAlbum = async (token, user) => {
    state.loading = true
   
    try {
      newAlbum.autor = user
    
      for(let i = 0; i < stateStorage.value.songs.length; i++){
        newAlbum.songs.push(stateStorage.value.songs[i].id)
        
      }
      msg.value = 'album criado com sucesso'
      state.albuns.push(await AlbumService.createAlbum(newAlbum, token))
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
    albuns,
    albunsByAutor,
    albunsBySongs,
    albunsBySearch,
    stateStorage,
    msg, 
    err,
    getAlbuns,
    getAlbunsByAutor,
    getAlbunsBySearch,
    createAlbum,
    toLeft
  }
})