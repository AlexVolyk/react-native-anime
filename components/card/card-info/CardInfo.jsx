import React from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet
} from 'react-native'

const CardInfo = ({ item, name }) => {
    return (
        <View style={style.card_info}>
            <View>
                <Image
                    style={style.img}
                    source={{
                        uri: item.titleImgUrl
                    }}
                    // resizeMethod='scale'
                />
            </View>
            <View style={{
                // width: 220,
                paddingTop: 10
            }}>
                {
                    name === 'AnimesForCheckings' ? (
                        <>
                            <Text style={style.card_text}>
                                {fw('Назва: ')} {item.title}
                            </Text>
                            <Text style={style.card_text}>
                                {fw('Тип: ')} {item.type}
                            </Text>
                            <Text style={style.card_text}>
                                {fw('Кількість епізодів: ')} {item.amountOfEpisodes}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={style.card_text}>
                                {fw('Назва: ')} {item.title}
                            </Text>
                            <Text style={style.card_text}>
                                {fw('Тип: ')} {item.type}
                            </Text>
                            <Text style={style.card_text}>
                                {fw('Рік: ')} {item.year}
                            </Text>
                            <Text style={style.card_text}>
                                {fw('Кількість епізодів: ')} {item.amountOfEpisodes}
                            </Text>
                            <Text style={style.card_text}>
                                {fw('Тривалість: ')} {item.timePerEpisode}
                            </Text>
                        </>
                    )
                }
            </View>
        </View>
    )
}

const fw = (word) => (
    <Text style={{ fontWeight: '600', color: 'white' }}>
        {word}
    </Text>
)


const style = StyleSheet.create({
    card_info: {
        width: 230,
        flexDirection: 'column',
        paddingTop: 30,
        marginTop: 5,
        paddingHorizontal: 5,
        // backgroundColor: 'red',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'purple'
    },
    img: {
        // width: 150,
        // height: 200,
        width: 150,
        height: 200,
        // textAlign: 'center'
    },
    card_text: {
        // backgroundColor: 'blue',
        // width: 250,
        color: 'grey',
        fontSize: 14
    }
})


export default CardInfo