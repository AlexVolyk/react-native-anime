import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/FontAwesome'

const Star = ({ top, right, size }) => {
    const rotateX = useSharedValue(0)
    const rotateY = useSharedValue(0)
    const rotateZ = useSharedValue(0)

    useEffect(() => {
        rotateX.value = withRepeat(withTiming(10, {
            duration: 2500,
            easing: Easing.linear,
        }), -1, true)
        rotateY.value = withRepeat(withTiming(20, {
            duration: 2500,
            easing: Easing.linear,
        }), -1, true)
        rotateZ.value = withRepeat(withTiming(30, {
            duration: 2500,
            easing: Easing.linear,
        }), -1, true)
        return () => {
            cancelAnimation(rotateX);
            cancelAnimation(rotateY);
            cancelAnimation(rotateZ);
        }
    })
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateX: `${rotateX.value}deg`,
                },
                {
                    rotateY: `${rotateY.value}deg`,
                },
                {
                    rotateZ: `${rotateZ.value}deg`,
                }
            ]
        }
    })
    return (
        <Animated.View style={[style.star_inner(top, right), rStyle]}>
            <View style={style.star_shadow} />
            <Icon name='star' size={size ? size : 50} color="#FFDF00" style={[{
                shadowColor: 'blue',
                zIndex: 2
            }]} />
        </Animated.View>
    )
}


const style = StyleSheet.create({
    star_inner: (top, right) => ({
        width: 50,
        height: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: top ? top : 20,
        right: right ? right : 35,
        zIndex: 5
    }),
    star_shadow: {
        width: 20,
        height: 20,
        borderRadius: 50,
        position: 'absolute',
        zIndex: 1,
        shadowColor: 'gold',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 44,
        elevation: 24,
    }
})

export default Star