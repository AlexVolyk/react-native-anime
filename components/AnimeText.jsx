import React from 'react'
import {
    ScrollView,
    Text
} from 'react-native'

const AnimeText = ({ anime, fw, style }) => {
    return (
        <ScrollView style={{ marginLeft: 10 }}>
            <Text style={style.title}>
                {fw('Назва: ')}
                {anime.title}
            </Text>
            {
                anime.otherTitle !== null &&
                <Text style={style.otherTitle}>
                    {fw('Інша Назва: ')}
                    {anime.otherTitle}
                </Text>
            }
            <Text style={style.year}>
                {fw('Рік: ')}
                {anime.year}
            </Text>
            <Text style={style.type}>
                {fw('Тип: ')}
                {anime.type}
            </Text>
            <Text style={style.genre}>
                {fw('Жанр: ')}
                {anime.genre}
            </Text>
            <Text style={style.director}>
                {fw('Автор: ')}
                {anime.director}
            </Text>
            <Text style={style.amountOfEpisodes}>
                {fw('Кількість епізодів: ')}
                {anime.amountOfEpisodes}
            </Text>
            <Text style={style.timePerEpisode}>
                {fw('Тривалість: ')}
                {anime.timePerEpisode}
            </Text>
        </ScrollView>
    )
}

export default AnimeText