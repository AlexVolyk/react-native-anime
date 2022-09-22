import React, { useEffect } from 'react'
import { axiosConfig } from '../../axiosConfig'

const useGetOtherAnimes = ({ page, route, PER_PAGE, setData, setLoading, setError, setAmount, setCurrentAmount }) => {

    const name = route.name
    const nameForFetch = name.toLowerCase()
    const url = `/${nameForFetch}/${page}/${PER_PAGE}`

    useEffect(() => {
        setLoading(true)
        axiosConfig.get(url)
            .then(res => {
                res = res.data
                // console.log(res,'res')
                setData(res.result)
                setAmount(res.count)
                setCurrentAmount(res.currentAmount)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data.message) {
                    setError(err.response.data.message)
                } else {
                    setError(err.response)
                }
                setTimeout(() => setError(false), 3000)
            })
    }, [url])

    return {
        name
    }
}

export default useGetOtherAnimes