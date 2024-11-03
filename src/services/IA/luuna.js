import api from "@/plugins/api";

class LunnaIAService{
    /**
     * Creates a new Slide
     * @param {Object} newSlide - The new slide to be created 
     * @returns {Promise<Object>} A promise that resolves to the created slides Object
     * @throws {Error} If an error occurs while creating the slide
     */

    async LuunaCreateResponse(awswer, token){
        try{
            const {data} =  await api.post('luna/', awswer, {headers: {Authorization: `Bearer ${token}`}})
            return data
        }
        catch(error){
            console.log('Error in Lunna chat ', error)
            throw error
        }
    }

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    
    async GetLunnaChat(user, token, page){
        try{
            const {data} = await api.get(`luna/?page=${page}&usuario=${user}`, {headers: {Authorization: `Bearer ${token}`}})
            return data
        }
        catch(error){
            console.log('Error in Lunna chat ', error)
            throw error
        }
    }
}
export default new LunnaIAService()