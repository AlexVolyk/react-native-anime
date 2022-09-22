import React from 'react'
import { axiosConfig } from '../../axiosConfig'

const useSearchAnimes = ({PER_PAGE, v, setLoading, setError, navigation}) => {
    const uri = `anime/title/title/${v === '' ? 'all' : v}/0/${PER_PAGE}`

    function refetch() {
        setLoading(true)
        axiosConfig.get(uri)
            .then(res => {
                res = res.data
                // console.log(res.data)
                setLoading(false)
                if (res.result && res.count) {
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
                // console.log(err.response.data.message);
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