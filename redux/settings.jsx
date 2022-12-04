import AsyncStorage from "@react-native-async-storage/async-storage"
import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    submitSearch: 'true'
}


const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        initSettings: (state) => {
            const storage = AsyncStorage.getAllKeys((k) => k)
            console.log(storage,"ssssssssssssssssssssssss");
            if (storage.length && storage.length > 0) {
                let obj = {}
                for (const storageKey of storage) {
                    let key = storageKey
                    let data = AsyncStorage.getItem(storageKey)
                    obj[key] = data
                }
                console.log(obj, 'objobjobjobjobjobjobj___________');
                return state = obj
            } else {
                const obj = {
                    'submitSearch': 'false'
                }
                // console.log(state = obj);
                console.log("ABOBABOABA````````````````````");
                return state = obj
            }
        },
        getSS: (state) => {
            let value = AsyncStorage.getItem('submitSearch')
            if (value == 'true') {
                value = true
            }
            else {
                value = false

            }

            return value
        }
        ,
        setSS: (state, { payload }) => {
            let value = AsyncStorage.setItem('submitSearch', payload)
            if (value == 'true') {
                value = true
            }
            else {
                value = false

            }

            console.log(value,'valuevaluevaluevaluevalue');
            return state['submitSearch'] = value
        }
    }
})


export const { getSS, initSettings , setSS} = settingSlice.actions

export default settingSlice.reducer