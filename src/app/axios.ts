import axios from "axios";

const api = axios.create({
    baseURL: "/api",        //http://localhost:8080
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;