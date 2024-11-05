import api from "@/plugins/api";

/**
 * Service class for handling slides related options
 */
class AlbumService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getAlbuns(token) {
        try {
            const { data } = await api.get('albuns/', {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: GetCommunity - return success")
            return data.results;
        } catch (error) {
            console.log("Service: GetCommunity - return error", error);
            throw error;
        }
    }

    async getAlbunsByAutor(autor, token) {
        try {
            const {data} = await api.get(`/albuns/?autor_id=${autor}`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getCommunityByAutor', error);
            throw error;
        }
    }

    async getAlbunsBySongs(songs, token) {
        try {
            const {data} = await api.get(`/albuns/?songs_id=${songs}`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getCommunityByAutor', error);
            throw error;
        }
    }
    
    async getAlbunsBySearch(search, token) {
        try {
            const {data} = await api.get(`/albuns/?search=${search}`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getCommunityByAutor', error);
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
    async createAlbum(newAlbum, token) {
        try {
            const { data } = await api.post('/albuns/', newAlbum, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: AddCommunity - return success")
            return data
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

export default new AlbumService();