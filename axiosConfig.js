import axios from "axios";

export const axiosConfig = axios.create({
    baseURL:'http://192.168.43.129:3000/'
})
// export const axiosConfig = axios.create({
    // baseURL: 'http://localhost:3000'
// })
// baseURL:'https://nestanime-production.up.railway.app/'
