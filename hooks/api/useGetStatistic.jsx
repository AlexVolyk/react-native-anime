import React, { useEffect } from 'react'
import { axiosConfig } from '../../axiosConfig'

const useGetStatistic = ({ setLoading, setStatistic, setError }) => {
    const url = 'animesstatistics'

    useEffect(() => {
        setLoading(true)
        axiosConfig.get(url)
            .then(res => {
                res = res.data
                setStatistic(res)
                setLoading(false)
            })
            .catch(err => {
                setError(err.response.data.message)
                setLoading(false)
            })
    }, [url])


}

export default useGetStatistic