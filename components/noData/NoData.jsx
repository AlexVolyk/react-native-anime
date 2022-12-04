import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
const NoData = () => {
    return (
        <View style={style.noData_inner}>
            <Text style={style.noData_text}>
                No Animes
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    noData_inner: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'red',
        height: '130%',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        // backgroundColor: 'rgba(255,255,255,0.2)',
        position: 'absolute',
        zIndex: 3,
    },
    noData_text: {
        fontSize: 44
    }
})

export default NoData