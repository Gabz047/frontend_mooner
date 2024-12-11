import api from "@/plugins/api";

/**
 * Service class for handling slides related options
 */
class CommunityService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getCommunitys(token) {
        try {
            const { data } = await api.get('/communitys/', {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: GetCommunity - return success")
            return data.results;
        } catch (error) {
            console.log("Service: GetCommunity - return error", error);
            throw error;
        }
    }

    async getCommunitysByAutor(user, token) {
        try {
            const {data} = await api.get(`/communitys/?artist_name=${user}`, {headers: {'authorization': `Bearer ${token}`}});
            return data.results
        } catch (error) {
            console.log('Error in getCommunityByAutor', error);
            throw error;
        }
    }

    async GetChatCommunity(id, token){
        try {
            const {data} = await api.get(`/communitys/${id}/`, {headers: {'authorization': `Bearer ${token}`}});
            return data
        } catch (error) {
            console.log('Error in getCommunityByAutor', error);
            throw error;
        }
    }

    async getCommunitysByName(name, token) {
        try {
            const {data} = await api.get(`/communitys/?search=${name}`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getCommunitysByAutor', error);
            throw error;
        }
    }
    
    // async getPlaylistsByName(song, token) {
    //     try {
    //         const {data} = await api.get(`/playlists/?name=${song}`, {headers: {'authorization': `Bearer ${token}`}});
    //     return data.results
    //     } catch (error) {
    //         console.log('Error in getPlaylistsBySongs', error);
    //         throw error;
    //     }
    // }


    

    /**
     * Creates a new Slide
     * @param {Object} newSlide - The new slide to be created 
     * @returns {Promise<Object>} A promise that resolves to the created slides Object
     * @throws {Error} If an error occurs while creating the slide
     */
    async createCommunity(newCommunity, token) {
        try {
            const { data } = await api.post('/communitys/', newCommunity, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: AddCommunity - return success")
            return data;
        } catch (error) {
            console.log("Service: AddCommunity - return error", error);
            throw error;
        }
    }


    /**
     * Updates an existing slide
     * @param {Object} slide - The updated slide to be saved
     * @param {Object} id - The slide id to be saved
     * @returns {Promise<Object>} A promise that resolves to the updated slides Object
     * @throws {Error} If an error occurs while updating the slide
     */
    }

export default new CommunityService();