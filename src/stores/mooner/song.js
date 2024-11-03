import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
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
    songsByGenre: [],
    loading: false,
    error: null,
    connection: false
  })

  const newsong = reactive({
    title: null,
    artists: [],
    lyrics: null,
    genre: null,
    cover: null,
    player: null
  })

  const msg = ref('')
  const err = ref(false)
  
  const songs = computed(() => state.songs)
  const songsByTitle = computed(() => state.songsByTitle)
  const selectedSong = computed(()=> state.selectedSong)
  const isLoading = computed(() => state.loading)
  const songsCount = computed(() => state.songs.length)
  const songsByGenre = computed(() => state.songsByGenre)

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
      const response = await SongService.getSongByTitle(name,token)  
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
  const createSong = async (token) => {
    state.loading = true
    try {
        newsong.title = ArtistProgressStore.state.artist_create_song_fields[0].value
        newsong.genre = ArtistProgressStore.state.artist_create_song_fields[1].value
        newsong.lyrics = ArtistProgressStore.state.artist_create_song_fields[2].value  
        if(!newsong.title || !newsong.player || !newsong.cover){
            err.value = true
            msg.value = 'preencha os campos corretamente'
        }
        else{
            msg.value = 'musica lançada com sucesso'
            state.songs.push(await SongService.createSong(token))
            err.value = false
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

  const GetSongByGenre = async (genre, token) =>{
    state.loading = true
    try {
      const response = await SongService.getSongByGenre(genre, token)  
      state.songsByGenre = response
      console.log(response)
      console.log(genre)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }
  

  return {
    state,
    isLoading,
    songsCount,
    songs,
    newsong,
    songsByTitle,
    selectedSong,
    songsByGenre,
    err,
    msg,
    getSongs,
    getSongsByName,
    createSong,
    updateOrgan,
    deleteOrgan,
    GetSongByGenre,
  }
})