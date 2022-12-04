import React, { useEffect, useState } from 'react'
import {
    FlatList,
    View,
    ImageBackground,
    StyleSheet,
    Dimensions
} from 'react-native'
import levi from '../assets/levi.jpg'

import AnimeCardWithout from '../components/card/anime-card-without/AnimeCardWithout';
import Pagination from '../components/pagination/Pagination';
import NoData from '../components/noData/NoData'
import Loading from '../components/loading/Loading';
import Notifications from '../components/notifications/Notifications';
import FilterBlock from '../components/filter/filter-block/FilterBlock';
import AmounInfo from '../components/amount-info/AmounInfo';

import useGetOtherAnimes from '../hooks/api/useGetOtherAnimes';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ANIMEFW } from '../redux/constant';



const objNames = {
    animes: 'Animes',
    animesForCheckings: 'AnimesForCheckings',
    animesForWatchigns: 'AnimesForWatchings',
    animesStatistics: 'AnimesStatistics',
    pageMiddleware: 'PageMiddleware',
}


const AnimesCardWithoutTable = ({ navigation, route }) => {
    const [totalAmount, setTotalAmount] = useState(null)
    const [currentAmount, setCurrentAmount] = useState(null)
    const [prevCurrentAmount, setPrevCurrentAmount] = useState(null)
    const [pathName, setPathName] = useState(null)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [perPage, setPerPage] = useState(null)
    const [filterToggle, setFilterToggle] = useState(false)
    const { height } = Dimensions.get('window')

    // console.log(route);
    // const pathName = ANIMEFW 


    let page = route.params ? route.params.page : 0
    const { name } = useGetOtherAnimes({
        page,
        route,
        setTotalAmount,
        setData,
        setError,
        setLoading,
        setCurrentAmount,
        setPrevCurrentAmount,
        setPerPage,
    })
    // console.log('sddsadsdsadsdsadsdsadsasdsad');

    function swipeLeftDetector(e) {
        // console.log(e.moveX, 'moveX');
        if (e.moveY > 100 && e.moveY < 660) {
            if (e.moveX > 195 && e.moveX < 400) {
                // console.log('yee done to true')
                // console.log(e.moveX, 'moveX');

                // console.log(e.moveY, 'moveY');
                // setToggle(true)
                // if (!title) {
                if (pathName === ANIMEFW) {
                    setFilterToggle(prev => !prev)
                } else {
                    setFilterToggle(false)
                }

                // }

            }

        }
    }


    useEffect(() => {
        setPathName(route.name.toLowerCase())
    }, [route.name])
    return (
        <>
            <GestureRecognizer
                onSwipeLeft={swipeLeftDetector}
                // onSwipeRight={swipeRightDetector}
                // onSwipeUp={swipeRightDetector}
                style={{ flex: 1 }}
            >
                <ImageBackground source={levi} resizeMode="cover" style={{ flex: 1 }}>
                    <Notifications
                        toggle={error}
                        top={50}
                        setToggle={setError}
                        time={3000}
                    />
                    <FilterBlock
                        toggle={filterToggle}
                        setToggle={setFilterToggle}
                        pathName={ANIMEFW}
                    />
                    <View style={style.content_inner}>
                        <AmounInfo
                            totalAmount={totalAmount}
                            currentAmount={currentAmount}
                            prevCurrentAmount={prevCurrentAmount}
                        />
                        {
                            loading ? (
                                <>
                                    <Loading />
                                    <View style={{ flex: 1 }} />
                                </>
                            ) : (
                                data.length > 0 && !loading ? (
                                    <>
                                        <FlatList
                                            contentContainerStyle={{
                                                alignItems: 'center',
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            initialNumToRender={1}
                                            data={data}
                                            renderItem={({ item }) =>
                                                <AnimeCardWithout item={item} key={item._id} name={name} />
                                            }
                                        />
                                    </>
                                ) : (
                                    <NoData />
                                )
                            )
                        }
                    </View>
                    <Pagination
                        amount={totalAmount}
                        perPage={perPage}
                        page={page}
                        objNames={objNames}
                        name={name}
                    />
                </ImageBackground>
            </GestureRecognizer>
        </>
    )
}


const style = StyleSheet.create({
    content_inner: {
        flex: 1,
        // alignItems: 'center',
        position: 'relative',
        paddingTop: 50,
        // height: 350,
        // backgroundColor: 'blue'
    },
    noData_inner: (height) => ({
        alignItems: 'center',
        position: 'relative',
        height: height - 200
    })
})

export default AnimesCardWithoutTable