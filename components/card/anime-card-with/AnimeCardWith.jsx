import React, { memo } from 'react'
import {
    StyleSheet,
    Text, View,
    Linking,
    TouchableOpacity
} from 'react-native'
import { Link } from '@react-navigation/native'
import Animated, { FadeIn } from 'react-native-reanimated'

import Star from '../../Star'
import CardInfo from '../card-info/CardInfo'



const AnimeCardWith = ({ item }) => {
    const name = 'Animess'
    const url = item.site

    const oUrl = () => {
        Linking.canOpenURL(url).then((supported) => {
            return Linking.openURL(url);
        })
    }
    // console.log(item);
    return (
        <>

            <TouchableOpacity activeOpacity={0.8}>
                <Animated.View layout entering={FadeIn.duration(500)} style={style.card}>
                    {/* <View layout entering={FadeIn} style={style.card}> */}
                    <View>
                        {
                            item.recomennded === true && <Star top={10} right={10}/>
                        }
                        <Link to={{
                            screen: 'Anime', params: {
                                _id: item._id,
                                name: item.title
                            }
                        }}>
                            <CardInfo item={item} name={name} />
                        </Link>
                        <Text onPress={oUrl} style={[style.anime_site, {flexWrap: 'wrap'}]}>
                            {fw('Сайт: ')} {item.site}
                        </Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
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
        position: 'relative',
        // maxWidth: 270,
        overflow: 'hidden',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    anime_site: {
        // textAlign: 'center',
        width: 230,
        color: 'red'
    }
})

export default memo(AnimeCardWith)