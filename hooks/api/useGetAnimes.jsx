import React, { useEffect, useMemo } from 'react'
import { axiosConfig } from '../../axiosConfig'

const useGetAnimes = ({ page, title, route, PER_PAGE, v, setData, setLoading, setError, setAmount, setCurrentAmount }) => {

    let url = useMemo(() => title ? `anime/title/title/${v === '' ? 'all' : v}/${page}/${PER_PAGE}` : `/anime/${page}/${PER_PAGE}`, [page, route.params])

    useEffect(() => {
        setLoading(true)
        axiosConfig.get(url)
            .then(res => {
                res = res.data
                // console.log(res,'res');
                setData(res.result)
                setAmount(res.count)
                setLoading(false)
                setCurrentAmount(res.currentAmount)

            })
            .catch(err => {
                // console.log(err.message,'err');
                if (err.response.data.message) {
                    setError(err.response.data.message)
                } else {
                    setError(err.response)
                }
                setTimeout(() => setError(false), 3000)
                setLoading(false)
            })
    }, [url])
}

export default useGetAnimes