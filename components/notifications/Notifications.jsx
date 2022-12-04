import React from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Notifications = ({ toggle, top, setToggle, time = 1000 }) => {
    const width = Dimensions.get('window').width
    const left = useSharedValue(-1000)
    const lineWidth = useSharedValue('100%')

    const rStyle = useAnimatedStyle(() => {
        left.value = toggle ? withTiming(0) : withTiming(-1000)
        return {
            left: left.value
        }
    })


    const rStyleLine = useAnimatedStyle(() => {
        lineWidth.value = toggle ? withTiming(0, { duration: time }) : withTiming('100%')
        return {
            width: lineWidth.value
        }
    })

    return (
        <Animated.View style={[
            style.notification_container({ width, top }),
            rStyle
        ]}>
            <TouchableOpacity style={style.cancel_icon_inner} onPress={() => setToggle(false)}>
                <Icon name='sword-cross' size={24} color={'black'} />
            </TouchableOpacity>
            <Text style={{ paddingHorizontal: 10, fontSize: 16, textAlign: 'center' }}>
                {toggle}
            </Text>
            <View style={style.line_inner}>
                <Animated.View style={[style.line, rStyleLine]} />
            </View>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    notification_container: ({ width, top }) => ({
        width,
        height: 100,
        top: top ? top : 100,
        backgroundColor: '#ff0000',
        position: 'absolute',
        zIndex: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    cancel_icon_inner: {
        position: 'absolute',
        top: 8,
        right: 8
    },
    line_inner: {
        width: '98%',
        height: 6,
        bottom: 10,
        borderRadius: 4,
        backgroundColor: '#660000',
        position: 'absolute',
        zIndex: 11,
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 24,
    },
    line: {
        height: 6,
        borderRadius: 4,
        backgroundColor: '#b30000',
        zIndex: 11,
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 24,
    }
})

export default Notifications