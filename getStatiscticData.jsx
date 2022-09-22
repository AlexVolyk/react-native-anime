import React from 'react'
import { Text, View } from 'react-native'


const Time = (category, time) => (
    <>
        <Text style={{
            color: 'white'
        }}>
            <Text style={{
                fontSize: 15,
                fontWeight: '500'
            }}>
                {category} :
            </Text>
            <Text style={{
                fontSize: 14,
            }}>
                {' '}
                {time.toFixed(2)}
            </Text>
        </Text>
    </>
)


const Txt = (category, what, amount) => (
    <>
        <Text style={{
            color: 'white'
        }}>
            <Text style={{
                fontSize: 14,
                fontWeight: '500'
            }}>
                {category} :
            </Text>
            <Text style={{
                fontSize: 14,
            }}>
                {' '}{what} -
            </Text>
            <Text style={{
                fontSize: 14,
            }}>
                {' '}{amount}
            </Text>
        </Text>
    </>
)


const getStatiscticData = (statistic) => {
    // console.log(statistic,'setStatistic');
    let
        year1,
        type1,
        genre1,
        amountOfEpisodes1,
        top1TimePerEpisod1;

    let ab = statistic[0]
    let top1 = ab.top1
    let timeStat = ab.timeStatistic
    const { days, hours, minutes } = timeStat

    year1 = top1.top1Year
    year1 = year1.maximum

    type1 = top1.top1Type
    type1 = type1.maximum

    genre1 = top1.top1Genre
    genre1 = genre1.maximum

    amountOfEpisodes1 = top1.top1AmountOfEpisodes
    amountOfEpisodes1 = amountOfEpisodes1.maximum

    top1TimePerEpisod1 = top1.top1TimePerEpisode
    top1TimePerEpisod1 = top1TimePerEpisod1.maximum

    return (
        <>
            {Time('Дні', days)}
            {Time('Години', hours)}
            {Time('Хвилини', minutes)}
            {Txt('Рік', year1[1], year1[2])}
            {Txt('Тип', type1[1], type1[2])}
            {Txt('Жанр', genre1[1], genre1[2])}
            {Txt('Кількість епізодів', amountOfEpisodes1[1], amountOfEpisodes1[2])}
            {Txt('Час на епізод', top1TimePerEpisod1[1], top1TimePerEpisod1[2])}
            {Txt('Тип', type1[1], type1[2])}
        </>
    )
}

export default getStatiscticData