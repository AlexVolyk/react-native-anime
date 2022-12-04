import React, { useEffect, useState } from 'react'
import Animated, { Easing, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { View, Text, ScrollView, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/AntDesign'
import Filter from '../Filter';
import { axiosConfig } from '../../../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter, resetFilterF } from '../../../redux/filterSlice';
import { ANIME, ANIMEFW } from '../../../redux/constant';

const FilterBlock = ({ toggle, setToggle, pathName = null }) => {

    // const fil = useSelector(state => state.filter)
    // console.log(fil, 'fil');
    const dispatch = useDispatch()


    const [data, setData] = useState([])
    const [rotateCountReset, setRotateCountReset] = useState(1)
    const [rotateCountClose, setRotateCountClose] = useState(1)


    const { width } = Dimensions.get('screen')


    const rotateDegClose = 360
    const rotateDegReset = 360

    const durationToggleBlock = 500
    const durationClose = 500
    const durationReset = 1500

    const rotateReset = useSharedValue(0)
    const rotateClose = useSharedValue(0)


    const toggleBlock = useDerivedValue(() => {
        // console.log(toggle, 'toggle');
        return toggle !== true ? withTiming(1, { duration: durationToggleBlock }) : withTiming(0, { duration: durationToggleBlock })

    }, [toggle])

    const rToggleBlock = useAnimatedStyle(() => {
        // console.log(width);
        // console.log(translateX.value,'value');
        const trans = interpolate(toggleBlock.value,
            [0, 1],
            // [0, width - 410]
            [1, width + 50]
        )
        return {
            transform: [
                {
                    translateX: trans
                }
            ]
        }
    }, [toggle])


    const rRotateClose = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotateClose.value}deg`
                }
            ]
        }
    })


    const rRotateReset = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotateReset.value}deg`
                }
            ]
        }
    })


    function close() {
        rotateClose.value = withTiming(rotateDegClose * rotateCountClose, { duration: durationClose, easing: Easing.linear })
        setToggle(false)
        setRotateCountClose(prev => prev + 1)
    }


    function reset(pathName) {
        if (pathName === ANIME) {
            dispatch(
                resetFilter()
            )

        } else if (pathName === ANIMEFW) {
            dispatch(
                resetFilterF()
            )
        }
        rotateReset.value = withTiming(rotateDegReset * rotateCountReset, { duration: durationReset, easing: Easing.linear })

        // rotateReset.value = withTiming(rotateDegReset * rotateCountReset, { duration: 500, easing: Easing.linear })
        // console.log(rotateReset.value);
        // console.log(rotateCountReset, 'rotateCountReset BEFORE');
        // if (rotateCountReset > 3) {
        //     console.log('> 3');
        //     setRotateCountReset(1)
        //     console.log(rotateCountReset, 'rotateCountrotateCountrotateCountrotateCount');
        //     rotateReset.value = withTiming(rotateDegReset, { duration: 500, easing: Easing.linear })
        //     // rotateReset.value = withSequence(
        //     //     withTiming(rotateDegReset, { duration: 500, easing: Easing.linear }),
        //     //     withTiming(rotateDegReset * (rotateCountReset + 1), { duration: 500, easing: Easing.linear })
        //     // )


        // }
        setRotateCountReset(prev => prev + 1)
        // if (rotateCountReset < 3) {
        //     rotateDegReset = 360
        //     setRotateCountReset(1)
        //     rotateReset.value = withTiming(rotateDegReset * rotateCountReset, { duration: 500, easing: Easing.linear })
        // }
        // rotateCountReset = rotateCountReset + 1
        // console.log(rotateCountReset, 'rotateCountReset AFTER');

    }


    useEffect(() => {
        const url = `${pathName === ANIME ? ANIME : ANIMEFW}/nameType/nameType/nameType`
        axiosConfig.get(url)
            .then(res => {
                // console.log(res.data)
                setData(res.data)
            })
            .catch(err => console.log(err))

    }, [pathName])






    function onSwipeClose(e) {

        // console.log(e, 'eeeeeee');
        // console.log('aaaaaaaaaaaaaaaaaaaa');
        setToggle(false)
    }
    return (
        // <GestureRecognizer
        // //     // onMagicTap={(e) => console.log('adsadas', e)}
        //     onSwipeRight={onSwipeClose}
        // //     style={{
        // //         flex: 1,
        // //         backgroundColor: 'red',
        // //         // position: 'relative',
        // //         // top: 0,
        // //         // left: 0,
        // //         // right: 0,
        // //         // bottom: 0,
        // //         zIndex: 10
        // //     }}
        // >
        <Animated.View style={[{
            // backgroundColor: 'white',
            top: 100,
            // left: 0,
            // bottom: 0,
            right: 0,
            zIndex: 14,
            position: 'absolute',
            maxWidth: 200,
            // height: 550,
            height: 500,


        },
            rToggleBlock
        ]}>
            <ScrollView style={{
                borderRadius: 4,
                backgroundColor: '#1c1c1a',
                // maxWidth: 250,
                // paddingLeft: 10
                // height: '20%',
                // display: 'flex',
                // justifyContent: 'center'
                // alignItems: 'center' 
            }}>
                {/* <Text style={{ color: 'red' }}>{toggle ? 'open' : 'closed'}</Text> */}
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    // height: 30,
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    // backgroundColor: 'blue',
                    zIndex: 3,
                    backgroundColor: '#1c1c1a',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Animated.View style={[
                        {},
                        rRotateClose
                    ]}>
                        <Icon
                            onPress={close}
                            // onPress={() => setToggle(false)}
                            name='close'
                            size={25}
                            color="#FFDF00"
                            style={{
                                // backgroundColor: 'red'
                            }}
                        />
                    </Animated.View>

                    <Animated.View style={[{
                        // shadowColor: 'blue',
                        zIndex: 2,
                        // position: 'absolute',
                        // top: 10,
                        // right: 10,
                        // paddingBottom: 20
                    },
                        rRotateReset
                    ]}>
                        <Icon
                            onPress={() => reset(pathName)}
                            name='reload1'
                            size={25}
                            color="#FFDF00"
                        />
                    </Animated.View>
                </View>

                {/* <Text onPress={() => console.log(fil)}> SHow MEEEEE</Text>
                <Text onPress={() => console.log(filter)}> SHow MEEEEE</Text> */}
                {
                    data && data?.length > 0 &&
                    <>
                        <View style={{ marginTop: 45 }}>
                            {data.map((res, index) =>
                                <Filter
                                    key={index}
                                    filterData={res.nameType}
                                    pathName={pathName}
                                />
                            )}
                        </View>
                    </>
                }
            </ScrollView>


        </Animated.View>
        // </GestureRecognizer>
    )



}

export default FilterBlock


