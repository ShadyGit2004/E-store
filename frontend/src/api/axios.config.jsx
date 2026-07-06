import {create} from "axios"

const axios = create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials: true
}) 

export default axios;