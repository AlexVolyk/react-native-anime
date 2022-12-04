import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { axiosConfig } from '../../axiosConfig'
import { ANIME } from '../../redux/constant'
// Anime
const useGetAnimes = ({ page, title, route, v, setData, setLoading, setError, setTotalAmount, setCurrentAmount, setPrevCurrentAmount, setPerPage }) => {

    // const an = ANIME
    const pathName = ANIME
    const filter = useSelector(state => state.filter.filter[pathName])
    let url = useMemo(() => title ? `anime/title/title/${v === '' ? 'all' : v}/${page}` : `anime/${page}`, [page, route.params, filter])

    useEffect(() => {
        setLoading(true)
        // console.log('http://192.168.43.129:3000'+url, 'uuuuuuuuuuuuuuuuu');
        // const a = 'http://192.168.43.129:3000'
        // const u = 'http://awweymo.kozaklyho.19000.exp.direct:80'
        // axiosConfig.post(a+url, { filter })
        axiosConfig.post(url, { filter })
            .then(res => {
                res = res.data
                // console.log(res,'res');

                // console.log(res.totalAnimes, res.currentAmount);
                setData(res.result)
                setTotalAmount(res.totalAmount)
                setLoading(false)
                setCurrentAmount(res.currentAmount)
                setPrevCurrentAmount(res.prevCurrentAmount)
                setPerPage(res.perPage)
                // console.log(res.perPage);

            })
            .catch(err => {
                console.log(JSON.stringify(err, null, 2), 'err here___________________');
                // console.log(err.response.data.message, 'err.response.data.message');
                if (err.response.data.message) {
                    setError(err.response.data.message)
                } else {
                    setError(err.response)
                }
                setTimeout(() => setError(false), 3000)
                setLoading(false)
            })
            // console.log('aaaaaa');
    }, [url, filter])
}

export default useGetAnimes