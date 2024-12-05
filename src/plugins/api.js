import axios from "axios";
const api = axios.create({
    baseURL: "http://191.52.56.212:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});
export default api;