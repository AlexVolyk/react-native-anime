import React, { memo } from 'react'
import {
    StyleSheet,
    Text,
    Linking
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

import CardInfo from '../card-info/CardInfo'

const AnimeCardWithout = ({ item, name }) => {
    const url = item.site

    const oUrl = () => {
        Linking.canOpenURL(url).then((supported) => {
            return Linking.openURL(url);
        })
    }
    return (
        <>
            <Animated.View layout entering={FadeIn.duration(500)} style={style.card}>
                {/* <View style={{
                    flexDirection: 'column',
                    paddingTop: 5,
                    marginTop: 5,
                    backgroundColor: 'red',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}> */}

                <CardInfo item={item} name={name} />
                {/* </View> */}
                <Text onPress={oUrl} style={style.card_text}>
                    {fw('Сайт: ')} {item.site}
                </Text>
            </Animated.View>
        </>
    )
}


const fw = (word) => (
    <Text style={{ fontWeight: '600', color: 'white' }}>
        {word}
    </Text>
)

const style = StyleSheet.create({

    card: {
        width: 250,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    card_text: {
        color: 'red'
    }
})

export default memo(AnimeCardWithout)