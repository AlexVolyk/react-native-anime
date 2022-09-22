import React, { useEffect, useMemo } from 'react'
import { axiosConfig } from '../../axiosConfig'

const useGetAnime = ({route, setLoading, setAnime, setError}) => {

    
    const _id = route.params._id !== undefined ? route.params._id : 1

    const url = useMemo(() => 'anime/' + _id, [_id])

    useEffect(() => {
        setLoading(true)

        axiosConfig.get(url)
            .then(res => {
                res = res.data
                // console.log(res, 'res')
                setLoading(false)
                if (res.description) {
                    res.description = getDescription(res)
                    
                }
                setAnime(res)
                setLoading(false)

            })
            .catch(err => {
                setLoading(false)
                // console.log(err);
                setError(err.response.data.message)
                setTimeout(() => setError(false), 3000)
            })
    }, [url])


    function getDescription(res) {
        let br = new RegExp('<br />', 'g')
        let span = new RegExp('(</span>|<span>)', 'g')

        let desc = res.description.replace(br, '\n')
        desc = desc.replace(span, '')

        return desc
    }

}

export default useGetAnime