import React, { useEffect, useState } from 'react'
import CheckBox from 'expo-checkbox'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addFilter, removeFilter, removeFilterF, addFilterF } from '../../redux/filterSlice'
import { ANIME, ANIMEFW } from '../../redux/constant'


const CHECKBOX = 'checkbox'
const TEXT = 'text'

const Checkbox = ({ isChecked, nameType, name, pathName }) => {
    // console.log(pathName, 'pathName');
    // pathName = 'anime'
    const fil = useSelector(state => state.filter.filter[pathName])

    const dispatch = useDispatch()
    const [toggleCheckBox, setToggleCheckBox] = useState(isChecked(fil, name, nameType))

    // const [toggleCheckBox, setToggleCheckBox] = useState(false)

    // useEffect(() => {
    //     if (isChecked(fil, name, nameType) === true) {
    //         console.log(isChecked(fil, name, nameType),'isChecked(fil, name, nameType)');
    //         console.log(toggleCheckBox, 'toggleCheckBox');
    //         setToggleCheckBox(navigatetrue)

    //     }

    // }, [])


    // const [toggleCheckBox, setToggleCheckBox] = useState(isChecked(filter, name, nameType))
    // const [check, setCheck] = useState(false)
    // console.log(Object.keys(filter), 'keysss');
    useEffect(() => {
        if (Object.keys(fil).length === 0) {
            setToggleCheckBox(false)
        }
    }, [fil])


    function choice(fromWhere, e, payload) {
        const compareWith = fromWhere === CHECKBOX ? e : !e
        if (compareWith === true) {
            if (pathName === ANIME) {
                dispatch(addFilter(payload))

            } else if (pathName === ANIMEFW) {
                dispatch(addFilterF(payload))
            }
        }
        else {
            if (pathName === ANIME) {
                dispatch(removeFilter(payload))

            } else if (pathName === ANIMEFW) {
                dispatch(removeFilterF(payload))
            }
        }
    }

    return (
        <View style={{
            // maxWidth: '30%',
            maxWidth: 150,
            marginLeft: 10,
            marginVertical: 5,
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'blue',

        }}>
            <CheckBox
                value={toggleCheckBox}
                color={toggleCheckBox && 'black'}
                style={{
                    backgroundColor: toggleCheckBox && 'black',
                    width: 16,
                    height: 16
                }}
                // onChange={(e) => console.log(e, 'eeee')}
                onValueChange={(e) => {
                    // console.log(e, 'e');
                    setToggleCheckBox(e)
                    const payload = {
                        title: name,
                        nameType
                    }

                    // const fromWhere = 'checkbox'
                    choice(CHECKBOX, e, payload)
                }}
            />
            <Text
                style={{
                    marginLeft: 5,
                    // backgroundColor: 'green',
                    // maxWidth: '20%',
                    paddingHorizontal: 3,
                    paddingVertical: 6,
                    color: 'white',
                    fontSize: 14
                }}
                onPress={() => {
                    // console.log(name, 'name');

                    setToggleCheckBox(prev => {
                        // console.log(!prev);
                        // console.log(prev, 'check');
                        const payload = {
                            title: name,
                            nameType
                        }
                        // const fromWhere = 'text'
                        choice(TEXT, prev, payload)
                        return !prev
                    })
                }}>
                {name}
            </Text>
        </View>
    )
}

export default Checkbox