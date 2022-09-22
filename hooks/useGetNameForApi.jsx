import React, { useEffect, useState } from 'react'


const useGetNameForApi = (route) => {
    const [name, setName] = useState('')
    const [nameForFetch, setNameForFetch] = useState('')


    useEffect(() => {
            // console.log(route,'route');
            let n = route.name
            setName(n)
            n = n.toLowerCase()
            setNameForFetch(n)
            
    }, [route, route.params, route.name])
    // console.log(nameForFetch,'nameForFetch');
    return {name, nameForFetch}
}

export default useGetNameForApi