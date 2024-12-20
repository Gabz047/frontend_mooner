import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { CommunityService, CommunityPostsService, CommunityUsersService } from '@/services'


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
export const useCommunityStore = defineStore('community', () => {
  const state = reactive({
    communitys: [],
    communitysByAutor: [],
    communitysByName: [],
    selectedCommunity: {},
    communitysPosts: [],
    communityChat: [],
    communitysPostsByAutor: [],
    communitysPostsByCommunity: [],
    selectedCommunityPost: {},
    communityUser: [],
    loading: false,
    error: null,
    connection: false
  })
  const communitys = computed(() => state.communitys)
  const communitysByAutor = computed(() => state.communitysByAutor)
  const communitysByName = computed(() => state.communitysByName)
  const selectedCommunity = computed(() => state.selectedCommunity)
  const CommunityChat = computed(() => state.communityChat)
  const communitysPosts = computed(() => state.communitysPosts)
  const communitysPostsByAutor = computed(() => state.communitysPostsByAutor)
  const communitysPostsByCommunity = computed(() => state.communitysPostsByCommunity)
  const selectedCommunityPost = computed(() => state.selectedCommunityPost)
  const CommunityUser = computed(() => state.communityUser)
  const communitycover = ref(null)


  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getCommunitys = async (token) => {
    state.loading = true
    try {
      state.communitys = await CommunityService.getCommunitys(token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getCommunitysPosts = async (token) => {
    state.loading = true
    try {
      state.communitysPosts = await CommunityPostsService.getCommunitysPosts(token)
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
   const getCommunitysByAutor = async (autor ,token) => {
    state.loading = true
    try {
      const response = await CommunityService.getCommunitysByAutor(autor ,token)  
      state.communitysByAutor = response
      console.log(response)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const GetCommunityChat = async (id, token) =>{
    state.loading = true
    try {
      const response = await CommunityService.GetChatCommunity(id ,token)  
      state.communityChat = response
      console.log(response)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getCommunitysPostsByAutor = async (autor,token) => {
    state.loading = true
    try {
      const response = await CommunityPostsService.getCommunitysPostsByAutor(autor,token)  
      state.communitysPostsByAutor = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getCommunitysByName = async (name,token) => {
    state.loading = true
    try {
      const response = await CommunityService.getCommunitysByName(name,token)  
      state.communitysByName = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getCommunitysPostsByCommunity = async (community,token) => {
    state.loading = true
    try {
      const response = await CommunityPostsService.getCommunitysPostsByCommunity(community,token)  
      state.communitysPostsByCommunity = response
      console.log(response)
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
  const createCommunity = async (newCommunity, token) => {
    state.loading = true
    try {
      const response = await CommunityService.createCommunity(newCommunity, token)
      state.communitys.push(response)
      console.log(response)
      return response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }
  
  const createCommunityPost = async (newCommunityPost, token) => {
    state.loading = true
    try {
      console.log(newCommunityPost)
      state.communitysPostsByCommunity.push(await CommunityPostsService.createCommunityPost(newCommunityPost, token))
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getCommunityUser = async (id, token) => {
    state.loading = true
    try {
      state.communityUser = await CommunityUsersService.getUserCommunitys(id, token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const CreateCommunityUser = async (EnterCommunity, token) => {
    state.loading = true
    try {
      const response = await CommunityUsersService.createUserCommunity(EnterCommunity, token)
      state.communityUser = response
      return response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const deleteCommunity = async (id, token) => {
    try {
      await CommunityUsersService.deleteCommunity(id, token)
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
    communitys,
    communitysByAutor,
    communitysByName,
    selectedCommunity,
    communitysPosts,
    communitysPostsByCommunity,
    communitysPostsByAutor,
    communitycover,
    CommunityUser,
    CommunityChat,
    getCommunitys,
    GetCommunityChat,
    getCommunitysByAutor,
    getCommunitysByName,
    createCommunity,
    getCommunitysPosts,
    getCommunitysPostsByAutor,
    getCommunitysPostsByCommunity,
    createCommunityPost, 
    getCommunityUser,
    CreateCommunityUser,
    deleteCommunity
  }
})