// import React from 'react'
// import { ImageBackground, View } from 'react-native'
// import levi from '../../assets/levi.jpg'

// import { VictoryPie } from 'victory-native'

// import { aboba } from '../../stat'

// const d = [
//     { quarter: 1, earnings: 13000 },
//     { quarter: 2, earnings: 16500 },
//     { quarter: 3, earnings: 14250 },
//     { quarter: 4, earnings: 19000 }
// ];

// const data = [
//     {
//         "x": "rust",
//         "label": "rust",
//         "value": 428,
//         "color": "hsl(76, 70%, 50%)"
//     },
//     {
//         "x": "c",
//         "y": 324,
//         "color": "hsl(24, 70%, 50%)"
//     },
//     {
//         "x": "sass",
//         "y": 127,
//         "color": "hsl(307, 70%, 50%)"
//     },
//     {
//         "x": "ruby",
//         "y": 203,
//         "color": "hsl(354, 70%, 50%)"
//     },
//     {
//         "x": "make",
//         "y": 487,
//         "color": "hsl(360, 70%, 50%)"
//     }
// ]

// function getDataResult(obj) {
//     const arr = []
//     for (const iterator in obj) {
//         // console.log(iterator);
//         arr.push({ x: iterator, y: obj[iterator] })
//     }
//     return arr

// }
// const yearStatistic = aboba[0].yearStatistic
// const genreStatistic = aboba[0].genreStatistic
// const timePerEpisodeStatistic = aboba[0].timePerEpisodeStatistic
// const typeStatistic = aboba[0].typeStatistic
// const amountOfEpisodesStatistic = aboba[0].amountOfEpisodesStatistic

// let year = getDataResult(yearStatistic)
// let genre = getDataResult(genreStatistic)
// let time = getDataResult(timePerEpisodeStatistic)
// let type = getDataResult(typeStatistic)
// let amount = getDataResult(amountOfEpisodesStatistic)

// console.log(year, 'year');
// console.log(genre, 'genre');
// console.log(time, 'time');
// console.log(type, 'type');
// console.log(amount, 'amount');





// const AnimesStatistics = () => {
//     return (
//         <ImageBackground source={levi} resizeMode="cover" style={{ flex: 1 }}>
//             <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255, 0.4)' }}>
//                 {/* <VictoryPie
//                 //   colorScale={["tomato", "orange", "gold" ]}
//                 style={{
//                     labels: {fill: 'black'},
                    
//                 }}
//                     // data={[
//                     //     { x: "Cats", y: 79, label: 'aboba' },
//                     //     { x: "Dogs", y: 40, label: 'aboba' },
//                     //     { x: "Birds", y: 55, label: 'aboba' }
//                     // ]}
//                     data={year}
//                 /> */}
//                 <VictoryPie
//                     style={{
//                         labels: { fill: 'black' },
//                     }}
//                     data={amount}
//                 />
//             </View>
//         </ImageBackground>
//     )
// }


// export default AnimesStatistics