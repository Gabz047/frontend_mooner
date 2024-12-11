import api from "@/plugins/api";

/**
 * Service class for handling slides related options
 */
class CommunityUserService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getUserCommunitys(id, token) {
        try {
            const { data } = await api.get(`/community-users/?community=${id}`, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: GetCommunity - return success")
            return data.results;
        } catch (error) {
            console.log("Service: GetCommunity - return error", error);
            throw error;
        }
    }

    async createUserCommunity(EnterCommunity, token){
        try {
            const { data } = await api.post(`/community-users/`, EnterCommunity, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: GetCommunity - return success")
            return data
        } catch (error) {
            console.log("Service: GetCommunity - return error", error);
            throw error;
        }
    }
    
    async deleteCommunity(id, token){
        try {
            const { data } = await api.delete(`/communitys/${id}/`, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: deleteCommunity - return success")
            return data
        } catch (error) {
            console.log("Service: GetCommunity - return error", error);
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

export default new CommunityUserService();