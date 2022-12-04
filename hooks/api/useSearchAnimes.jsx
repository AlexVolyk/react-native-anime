import React from 'react'
import { axiosConfig } from '../../axiosConfig'

const useSearchAnimes = ({ v, setLoading, setError, navigation }) => {
    const uri = `anime/title/title/${v === '' ? 'all' : v}/0`


    function refetch() {
        setLoading(true)
        axiosConfig.post(uri)
            .then(res => {
                res = res.data
                // console.log(res.count)
                setLoading(false)
                if (res.result && res.totalAmount) {
                    navigation.navigate({
                        name: 'Animess',
                        params: {
                            title: v,
                            page: 0,
                        }
                    })
                }
            })
            .catch(err => {
                console.log(JSON.stringify(err, null, 2), 'err ');
                // console.log(typeof err,'err')
                if (err.response.data.message) {
                    setError(err.response.data.message)
                } else {
                    setError(err.response)
                }
                setLoading(false)
                setTimeout(() => setError(false), 3000)
            })
    }


    return {
        refetch
    }
}

export default useSearchAnimes