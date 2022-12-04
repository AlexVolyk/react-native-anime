import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'

const TotalAmount = ({ prevCurrentAmount = null, totalAmount, topSpace, color, backgroundColor }) => {

    const rtotalAmount = useSharedValue(0)

    const duration = totalAmount < 100 ? 2000 : totalAmount * 10
    useEffect(() => {
        rtotalAmount.value = withTiming(totalAmount, { duration })
    }, [totalAmount])
    const amount = useDerivedValue(() => (`${rtotalAmount.value.toFixed(0)}`));

    // const rprevCurrentAmount = useSharedValue(0)

    // const prevDuration = prevCurrentAmount < 100 ? 2000 : prevCurrentAmount * 10
    // useEffect(() => {
    //     rprevCurrentAmount.value = withTiming(prevCurrentAmount, { prevDuration })
    // }, [prevCurrentAmount])
    // const prevAmount = useDerivedValue(() => (`${rprevCurrentAmount.value.toFixed(0)}`));

    return (
        <View style={[style.totalAmount_inner(topSpace, backgroundColor), {}]}>
            {
                prevCurrentAmount !== null ?
                    (
                        <>
                            <PrevTotalAmount prevCurrentAmount={prevCurrentAmount} color={color} />
                            {/* <Text> — </Text> */}
                            {/* <Text> - </Text> */}
                            <ReText style={style.totalAmount_text(color)} text={amount} />
                        </>

                    )
                    :
                    (
                        <ReText style={style.totalAmount_text(color)} text={amount} />
                    )
            }

        </View>
    )
}

const PrevTotalAmount = ({ prevCurrentAmount, color }) => {

    const rprevCurrentAmount = useSharedValue(0)

    const prevDuration = prevCurrentAmount < 100 ? 2000 : prevCurrentAmount * 10
    useEffect(() => {
        rprevCurrentAmount.value = withTiming(prevCurrentAmount, { prevDuration })
    }, [prevCurrentAmount])
    const prevAmount = useDerivedValue(() => (`${rprevCurrentAmount.value.toFixed(0)}`));

    return (
        <ReText style={style.totalAmount_text(color)} text={prevAmount} />
    )
}

const style = StyleSheet.create({
    totalAmount_inner: (topSpace, backgroundColor) => ({
        display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        position: 'absolute',
        left: 6,
        top: topSpace ? topSpace : 10,
        zIndex: 3,
        borderRadius: 4,
        backgroundColor: backgroundColor ? backgroundColor : 'rgba(255,255,255, 0.3)',

    }),
    totalAmount_text: (color) => ({
        // fontSize: 10 ,
        textAlign: 'center',
        color: color ? color : 'white',
        fontWeight: '300'
    })
})

export default TotalAmount