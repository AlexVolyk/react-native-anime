import axios from "axios";
const version = 1
const v = `v${version}/`

// export const axiosConfig = axios.create({
//     baseURL: `http://192.168.43.129:3000/${v}`
// })

export const axiosConfig = axios.create({
    baseURL: `https://nestanime-production.up.railway.app/${v}`
})


// export const axiosConfig = axios.create({
//     baseURL:'http://192.168.43.129:3000/'
// })
// export const axiosConfig = axios.create({
//     baseURL:'http://awweymo.kozaklyho.19000.exp.direct:80'
// })

// export const axiosConfig = axios.create({
//     baseURL: 'http://localhost:3000'
// })
// export const axiosConfig = axios.create({
//     baseURL:'https://nestanime-production.up.railway.app/'
// })
