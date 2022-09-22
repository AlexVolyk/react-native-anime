import { useEffect, useState } from "react"
import { axiosConfig } from "../axiosConfig"

export const getAnimes = async (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [amount, setAmount] = useState(0)

        //         .then(res => {
    //             // console.log(res,'ree');
    //             res = res.data
    //             // console.log(res,'res')
    //             // console.log(data,'data');
    //             setData(res.result)
    //             setAmount(res.count)
    //             setLoading(false)
    //         })
    // {
        //             // console.log('bbbb');
        //             // console.log(err.response.data.message, 'err.response.data.message');
        //             setLoading(false)
        //             setError(err.response.data.message)
        //             setTimeout(() => setError(false), 3000)
        //         })
        setLoading(true)
        useEffect(async() => {
            await axiosConfig.get(url)
            .then(res => {
                setLoading(false)
                setData(data.result)
                setAmount(res.count)
                // return {
                //     data: res.result,
                //     count: res.count
                // }
                // console.log(res,'res')
            })
            .catch(err => {
                setLoading(false)
                setError(err.response.data.message)
                setTimeout(() => setError(false), 3000)
                // return{
                //     message: err.response.data.message,
                //     // console.log(err.response.data.message,'err')
                // }
            })

        }, [url])
        
        return {
            data,
            error,
            amount,
            loading
        }
    // return axiosConfig.get(url)
    //     .then(res => console.log(res,'res'))
    //     .catch(err => console.log(err.response.data.message,'err'))
}