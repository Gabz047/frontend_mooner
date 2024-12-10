import api from "@/plugins/api";

/**
 * Service class for handling slides related options
 */
class ArtistService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getArtists(token) {
        try {
            const { data } = await api.get('/artists');
            console.log( "Service: GetArtists - return success")
            return data.results;
        } catch (error) {
            console.log("Service: GetArtists - return error", error);
            throw error;
        }
    }

    async getArtistsByName(name) {
        try {
            const {data} = await api.get(`/artists/?search=${name}`);
        return data.results
        } catch (error) {
            console.log('Error in GetArtistsByAutor', error);
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
    async createArtist(newArtist, token) {
        try {
            const { data } = await api.post('/artists/', newArtist, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: AddCommunity - return success")
            return data.results;
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

export default new ArtistService();