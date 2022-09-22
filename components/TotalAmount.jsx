import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'

const TotalAmount = ({ totalAmount, topSpace, color, backgroundColor }) => {

    const rtotalAmount = useSharedValue(0)

    const duration = totalAmount < 100 ? 2000 : totalAmount * 10
    useEffect(() => {
        rtotalAmount.value = withTiming(totalAmount, { duration })
    }, [totalAmount])
    const amount = useDerivedValue(() => (`${rtotalAmount.value.toFixed(0)}`));

    return (
        <View style={[style.totalAmount_inner(topSpace, backgroundColor)]}>
            <ReText style={style.totalAmount(color)} text={amount} />
        </View>
    )
}

const style = StyleSheet.create({
    totalAmount_inner: (topSpace, backgroundColor) => ({
        paddingHorizontal: 10,
        paddingVertical: 4,
        position: 'absolute',
        left: 6,
        top: topSpace ? topSpace : 10,
        borderRadius: 4,
        backgroundColor: backgroundColor ? backgroundColor : 'rgba(255,255,255, 0.3)',

    }),
    totalAmount:(color) => ({
        textAlign: 'center',
        color: color ? color : 'white',
        fontWeight: '300'
    })
})

export default TotalAmount