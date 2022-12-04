import React, { useState } from 'react'
import {
    StyleSheet,
    ActivityIndicator,
    View,
    Text
} from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import GestureRecognizer from 'react-native-swipe-gestures';
// import Constants from 'expo-device'

import getStatiscticData from './getStatiscticData';

import useGetStatistic from './hooks/api/useGetStatistic';

const StatisticBlock = ({ toggle, setToggle }) => {
    const [statistic, setStatistic] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    // console.log(statistic[0]);


    useGetStatistic({ setLoading, setStatistic, setError })


    const duration = 500
    const translateX = useDerivedValue(() => {
        // console.log(toggle,'toggle');
        // console.log(toggle === true ? withTiming(1, { duration }) : withTiming(0, { duration }));
        return toggle !== true ? withTiming(1, { duration }) : withTiming(0, { duration })

    }, [toggle])

    const rToggleBlock = useAnimatedStyle(() => {
        const trans = interpolate(translateX.value,
            [0, 1],
            [1, -300]
            // [0, 1],
            // [0, -300]
            // [1, 1],
            // [-300, 0]
        )
        // console.log(trans,'trans');
        return {
            transform: [
                {
                    translateX: trans
                }
            ]
        }
    }, [toggle])
    // const rToggleBlock = {
    //     transform: [
    //         {
    //             translateX: 0
    //         }
    //     ]
    // }


    // console.log(Constants.deviceId());
    return (
        <GestureRecognizer onSwipeLeft={() => setToggle(false)} style={{
            flex: 1,
            position: 'absolute',
            // height: 100,
            // width: 300,
            zIndex: 10,
            // backgroundColor: 'red'
            }}>
            <Animated.View style={[style.statistic_inner(error),
                rToggleBlock
            ]}>
                {
                    loading && statistic == null || statistic == null ? (
                        <View style={{ height: 175, justifyContent: 'center' }}>
                            <ActivityIndicator size={55} color="white" />
                        </View>
                    ) : (
                        error ? (
                            <View style={{ height: 175, justifyContent: 'center' }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>
                                    {error}
                                </Text>
                            </View>
                        ) : (
                            getStatiscticData(statistic)
                        )
                    )
                }
                {/* {
                    Constants.deviceId && <Text style={{color:'red'}}>Expo {Constants.deviceId}</Text>
                } */}
            </Animated.View>
        </GestureRecognizer >
    )
}

const style = StyleSheet.create({
    statistic_inner: (error) => ({
        // flex: 1,
        // width: '100%',
        // height: '100%',
        width: 300,
        // height: 252,
        // height: 300,
        // marginTop: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        position: 'absolute',
        top: 30,
        // left: 100,
        backgroundColor: error ? 'rgba(255,0,0,0.5)' : 'rgba(0,0,0,0.5)',
        zIndex: 9,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 17.84,
    })
})

export default StatisticBlock