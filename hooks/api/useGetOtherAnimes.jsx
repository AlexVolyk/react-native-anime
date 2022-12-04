import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { axiosConfig } from '../../axiosConfig'
import { ANIMEFW } from '../../redux/constant'

const useGetOtherAnimes = ({ page, route, setData, setLoading, setError, setTotalAmount, setCurrentAmount, setPrevCurrentAmount, setPerPage }) => {
    const filter = useSelector(state => state.filter.filter[ANIMEFW])
    // console.log(filter,'sssssss');

    const name = route.name
    const nameForFetch = name.toLowerCase()
    // console.log(nameForFetch, 'nameForFetch');
    // const url = `/${nameForFetch}/${page}/${PER_PAGE}`
    const url = `/${nameForFetch}/${page}`

    // console.log(url, 'url')

    useEffect(() => {
        setLoading(true)
        if (nameForFetch === ANIMEFW) {
            axiosConfig.post(url, { filter })
                .then(res => {
                    res = res.data
                    // console.log(res,'res')
                    setData(res.result)
                    setTotalAmount(res.totalAmount)
                    setCurrentAmount(res.currentAmount)
                    setPrevCurrentAmount(res.prevCurrentAmount)
                    setPerPage(res.perPage)
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
        } else {
            axiosConfig.get(url)
                .then(res => {
                    res = res.data
                    // console.log(res,'res')
                    setData(res.result)
                    setTotalAmount(res.totalAmount)
                    setCurrentAmount(res.currentAmount)
                    setPrevCurrentAmount(res.prevCurrentAmount)
                    setPerPage(res.perPage)
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

        }
        // axiosConfig.get(url)
        //     .then(res => {
        //         res = res.data
        //         // console.log(res,'res')
        //         setData(res.result)
        //         setAmount(res.count)
        //         setCurrentAmount(res.currentAmount)
        //         setPerPage(res.perPage)
        //         setLoading(false)
        //     })
        //     .catch(err => {
        //         setLoading(false)
        //         if (err.response.data.message) {
        //             setError(err.response.data.message)
        //         } else {
        //             setError(err.response)
        //         }
        //         setTimeout(() => setError(false), 3000)
        //     })
    }, [url, filter])

    return {
        name
    }
}

export default useGetOtherAnimes