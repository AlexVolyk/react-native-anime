import React, { useEffect, useState } from 'react'
import {
    Image,
    Text,
    StyleSheet,
    View,
    ScrollView,
    Linking,
    ImageBackground,
    Dimensions
} from 'react-native'
import levi from '../assets/levi.jpg'

import Star from '../components/Star'
import Notifications from '../components/notifications/Notifications'
import AnimeText from '../components/AnimeText'

import useGetAnime from '../hooks/api/useGetAnime'

const Anime = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [anime, setAnime] = useState({})
    const { height } = Dimensions.get('screen')

    useGetAnime({ route, setAnime, setLoading, setError })

    function checkData() {
        if (anime.hasOwnProperty('_id')) {
            let lenght = 0;

            for (const key in anime) {
                if (anime.hasOwnProperty(key)) {
                    lenght++
                    // console.log(key, anime[key]);
                    // console.log('aa');
                }
            }
            if (lenght < 13) {
                // setError('Не достатньо данних на сторінці. Ви будете повернуті на попередню сторінку.')
                setError('Не достатньо данних на сторінці')
                setTimeout(() => {
                    setError(false)
                    // navigation.goBack()
                }, 6000)
            }
            // console.log(lenght);
        }
    }
    useEffect(() => {
        checkData()
    }, [anime])

    const oUrl = (u) => {
        Linking.canOpenURL(u).then((supported) => {
            return Linking.openURL(u);
        })
    }



    return (
        <>
            <ImageBackground
                source={levi}
                resizeMode="cover"
                style={{
                    flex: 1,
                    height
                }}
            >
                <Notifications
                    setToggle={setError}
                    toggle={error}
                    time={6000}
                    top={50}
                />
                <ScrollView style={[{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    paddingHorizontal: 20,
                    // height
                    // flex: 1
                    // height: 100
                    // flex: 1
                    // height: height + 100
                    // margin: 0,
                    // padding: 0
                },
                ]}>
                    {
                        loading ? (
                            <Text>Loading...</Text>
                        ) : (
                            anime.hasOwnProperty('_id') &&
                            <>
                                <ScrollView style={{
                                    paddingTop: 20,
                                    paddingBottom: 55
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 50
                                    }}>
                                        <View style={{
                                            position: 'relative'
                                        }}>
                                            {
                                                anime.recomennded === true && (
                                                    <Star top={-20} right={-20} size={35} />
                                                )
                                            }
                                            <Image
                                                source={{
                                                    uri: anime.titleImgUrl
                                                }}
                                                style={style.img}
                                            />
                                            <Text onPress={() => oUrl(anime.site)} style={style.img_text}>
                                                Can be touched
                                            </Text>
                                        </View>
                                        <AnimeText anime={anime} fw={fw} style={style} />
                                    </View>
                                    <Text style={style.description}>
                                        {fw('Опис: ')}
                                        {anime.description}
                                    </Text>
                                </ScrollView>
                            </>
                        )
                    }
                </ScrollView>
            </ImageBackground>
        </>
    )
}


const fw = (word) => (
    <Text style={{ fontWeight: '600', color: 'white' }}>
        {word}
    </Text>
)

const an = {
    "_id": {
        "$oid": "61d0b076c5b6f15f9e38114c"
    },
    "title": "Мой сэмпай раздражает! / Senpai ga Uzai Kouhai no Hanashi",
    "titleImgUrl": "https://animevost.org/uploads/posts/2021-10/1633757121_1-1.jpg",
    "year": "2021",
    "type": "ТВ",
    "amountOfEpisodes": "12",
    "time": "2022/січ/сб [19:50]",
    "origin": "https://animevost.org",
    "site": "https://animevost.org/tip/tv/2705-senpai-ga-uzai-kouhai-no-hanashi.html",
    "watched": false,
    "description": "<span>Работа для современного человека представляется чем-то крайне важным, и вовсе необходимым, а потому к её поиску и выбору следует относиться ответственно. Футаба Игараси также считала, и исправно искала новую работу. Её успехи увенчались успехом. Новая работа виделась просто мечтой, но имелось одно обстоятельство, которое привносило ложку дегтя в бочку с медом. Фактором, омрачающим получение должности, становится Харуми Такэда. Этот парень казался совершенно обычным и даже безобидным, но девушка видела в нем лишь отрицательные черты.<br />\r\n<br />\r\nВ Харуми девушка отмечала невероятно раздражающий смех притом, что другие сотрудники реагировали совершенно нейтрально на то, как выражал парень радостные эмоции. Придиралась Футаба и к внешности коллеги, потому как Харуми виделся ей схожим на шкаф, причем довольно огромный. А самое раздражающее в его поведении было то, что он норовил подсобить Футабе и вообще воспринимал её, как ребенка малого. Немаловажную причину в этом играл тот факт, что девушка была невысокая и юно выглядела. И как назло, они много времени проводили вместе. При таком положении дел Футабе придется пересмотреть свое отношение к слишком внимательному коллеге.</span>",
    "director": "Ито Рёта",
    "genre": "романтика, комедия, повседневность",
    "timePerEpisode": "25 мин.",
    "otherTitle": "My Senpai Is Annoying",
    "recomennded": false,
    "pathname": "tip/tv/2705-senpai-ga-uzai-kouhai-no-hanashi.html"
}



const defFont = {
    fontSize: 13,
    color: 'grey',

}

const style = StyleSheet.create({
    img: {
        width: 150,
        height: 200,
        position: 'relative'
    },
    img_text: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        color: 'purple'
    },
    title: {
        // flexDirection: 'row',
        color: '#0e8b3e',
        fontSize: 15,
        fontWeight: '500',
        // flexWrap: 'wrap
    },
    otherTitle: {
        // color: 'red',
        ...defFont
        // fontWeight: '500'
    },
    year: {
        // color: 'blue',
        ...defFont
    },
    type: {
        ...defFont
        // color: 'blue'

    },
    genre: {
        // color: 'blue',
        ...defFont

    },
    director: {
        ...defFont
    },
    amountOfEpisodes: {
        ...defFont
    },
    timePerEpisode: {
        ...defFont
    },
    description: {
        ...defFont
    }
})

export default Anime