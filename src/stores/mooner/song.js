import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { SongService, RecomendationService } from '@/services'
import { useStorage } from '@vueuse/core'
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
  const state = useStorage('songStorage', {
    songs: [],
    selectedSong: {},
    songsByTitle: [],
    songsByGenre: [],
    songsByArtist: [],
    songsRecommended: [],
    songsByLast: [],
    loading: false,
    error: null,
    connection: false,
  })

  const simpleState = reactive({
    active: false,
    item_playlist: null,
    item_settings: null,
  })

  const activated = (item) => {
    if (simpleState.item_playlist != null && item.id == simpleState.item_playlist || simpleState.item_settings != null && item.id == simpleState.item_settings ) {
      simpleState.item_playlist = null
      simpleState.item_settings = null
    } else {
      if (item.name == 'settings') {
        simpleState.item_settings = item.id
        simpleState.item_playlist = null
      } else {
        simpleState.item_playlist = item.id
        simpleState.item_settings = null
      }
    }
    
  }

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

  const songs = computed(() => state.value.songs)
  const songsByTitle = computed(() => state.value.songsByTitle)
  const selectedSong = computed(() => state.value.selectedSong)
  const isLoading = computed(() => state.value.loading)
  const songsCount = computed(() => state.value.songs.length)
  const songsByGenre = computed(() => state.value.songsByGenre)
  const songsByArtist = computed(()=> state.value.songsByArtist)
  const songsByLast = computed(()=> state.value.songsByLast)

  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getSongs = async (token, page) => {
    state.value.loading = true
    try {
      state.value.songs = await SongService.getSong(token, page)
      return state.value.songs
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  /**
  * Fetches organs data.
  * @async
  * @function getOrgansBySystem
  */
  const getSongsByName = async (name, token) => {
    state.value.loading = true
    try {
      const response = await SongService.getSongByTitle(name, token)
      state.value.songsByTitle = response
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const createLastSongs = (song) => {
    state.value.songsByLast.push(song)
  }

  const getSongsByArtist = async (name, token) => {
    state.value.loading = true
    try {
      const response = await SongService.getSongByTitle(name, token)
      state.value.songsByArtist = response
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  /**
   * Creates a new organ.
   * @async
   * @function createSpecie
   * @param {Object} newSpecie - The new organ object to create.
   */
  const createSong = async (title, genre, lyrics, token, email) => {
    state.value.loading = true
    try {
      newsong.title = title
      newsong.genre = genre
      newsong.lyrics = lyrics
      newsong.artists.push(email)
      newsong.artists.reverse()
      if (!newsong.title || !newsong.player || !newsong.cover || !newsong.genre) {
        err.value = true
        msg.value = 'preencha os campos corretamente'
      }
      else {
        msg.value = 'musica lançada com sucesso'
        state.value.songs.push(await SongService.createSong(newsong, token))
        err.value = false
        console.log(newsong)
      }
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
    }
  }

  const createSongForAlbum = async (title, genre, lyrics, token, email) => {
    state.value.loading = true
    newsong.title = title
    newsong.genre = genre
    newsong.lyrics = lyrics
    newsong.artists.push(email)
    newsong.artists.reverse()
    try{
      if (!newsong.title || !newsong.player || !newsong.cover || !newsong.genre) {
        err.value = true
        msg.value = 'preencha os campos corretamente'
      }
      else {
        const songcreated = await SongService.createSong(newsong, token)
        console.log(songcreated)
        newsong.artists.splice(1, newsong.artists.length - 1)
        return songcreated
      }
    }
    catch(error){
      state.value.error = error
    }
    finally{
      state.value.loading = false
      state.value.connection = true
    }
  }

  const GetSongByGenre = async (genre, artist) => {
    state.value.loading = true
    try {
      const response = await SongService.getSongByGenre(genre, artist)
      state.value.songsByGenre = response
   
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const GetRecommendedSongs = async (user) => {
    state.value.loading = true
    try{
      const response = await RecomendationService.getRecomendation(user)
      state.value.songsRecommended = response
      console.log(response)
      return state.value.songsRecommended
    }
    catch(err){
      state.value.error = err
    }
    finally{
      state.value.loading = false
      state.value.connection = true
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
    songsByArtist,
    songsByLast,
    err,
    msg,
    simpleState,
    activated,
    getSongs,
    getSongsByName,
    getSongsByArtist,
    createSong,
    GetSongByGenre,
    createSongForAlbum,
    GetRecommendedSongs,
    createLastSongs
  }
})