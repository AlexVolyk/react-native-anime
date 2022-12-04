import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ANIME } from '../../redux/constant';
import { addFilter, removeFilter } from '../../redux/filterSlice';
import { setSS } from '../../redux/settings';

const SwitchCostume = ({ value = 'true', name, nameType, isChecked }) => {
    const fil = useSelector(state => state.filter.filter[ANIME])
    // const setting = useSelector(state => state.settings)
    // console.log(setting,'+++++++++++++++++++++++++++++++++++');

    const [isEnable, setIsEnable] = useState(isChecked(fil, value, nameType))
    // const [isAllowed, setIsAllowed] = useState(getSubmitSearch())

    // const [isAllowed, setIsAllowed] = useState('false')
    // console.log(AsyncStorage.getItem('submitSearch'), '-------------');

    // const [isEnable, setIsEnable] = useState(isChecked(filter, name, nameType))

    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.keys(fil).length <= 0) {
            setIsEnable(false)
        }
    }, [fil])
    // async function f() {
    //     await AsyncStorage.removeItem('submitSearch')
    //     console.log('remove___________-');
    // }
    // f()
    // useEffect(() => {
    //     // console.log(filter,'filterdata213213132132131232');
    //     if (Object.keys(filter).length <= 0) {
    //         console.log(filter, 'filterdata');
    //         setIsEnable(false)
    //     }
    // }, [filter])

    // async function getSubmitSearch() {
    //     // let value = await AsyncStorage.getItem('submitSearch')
    //     let value = setting['submitSearch']
    //     console.log(value,'value');
    //     // let value = await !AsyncStorage.getItem('submitSearch')
    //     // console.log(await AsyncStorage.getItem('submitSearch'), '++++++++++++++++');
    //     if (value == 'true') {
    //         value = await true
    //     }
    //     else {
    //         value = await false

    //     }

    //     // setIsAllowed()
    //     return await value

    // }

    // async function submitSearch(bool) {
    //     // console.log(await bool, 'bool');
    //     // console.log(await AsyncStorage.getItem('submitSearch'), 'await AsyncStorage.getItem(submitSearch)');
    //     await AsyncStorage.setItem('submitSearch', `${bool}`)
    // }
    return (
        <>

            {/* <Text style={{ color: 'white', }}>submitSearch</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isAllowed ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={isAllowed}
                onValueChange={(e) => {
                    // console.log(e, 'e');
                    dispatch(setSS(e))
                    setIsAllowed(e)
                    submitSearch(e)
                    // console.log(data);
                }} /> */}
            {/* <View style={{display: 'flex', alignItems: 'flex-end'}}> */}
            <View style={{
                marginTop: 10,
                paddingLeft: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
                // alignContent: 'center',
                // backgroundColor: 'purple'
            }}>

                <Text style={{
                    width: '60%',
                    color: 'white',
                    // backgroundColor: 'blue',
                }}>{name}</Text>
                {/* <Text style={{
                    width: '60%',
                    color: 'white',
                    backgroundColor: 'blue',
                }}>{toCapitalize(nameType)}</Text> */}
                <Switch
                    style={{
                        width: 50,
                        height: 30,
                        // backgroundColor: 'red',
                    }}
                    // trackColor={{ false: "#767577", true: "#81b0ff" }}
                    // thumbColor={isEnable ? "#f5dd4b" : "#f4f3f4"}

                    // trackColor={{ false: "#767577", true: "black" }}
                    trackColor={{ false: "#767577", true: "black" }}
                    thumbColor={"#f5dd4b"}
                    // thumbColor={isEnable ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    value={isEnable}
                    onValueChange={(e) => {
                        // console.log(e, 'e');
                        setIsEnable(e)
                        // console.log(data);
                        const payload = {
                            title: 'true',
                            nameType
                        }
                        if (e === true) {
                            dispatch(addFilter(payload))
                        } else {
                            dispatch(removeFilter(payload))
                        }
                    }}
                />
            </View>
        </>
    )
}

export default SwitchCostume