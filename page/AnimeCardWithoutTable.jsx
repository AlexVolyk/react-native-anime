import React, { useState } from 'react'
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
import TotalAmount from '../components/TotalAmount';
// import useGetNameForApi from '../../../hooks/useGetNameForApi';
import NoData from '../components/noData/NoData'
import Loading from '../components/loading/Loading';
import Notifications from '../components/notifications/Notifications';

import useGetOtherAnimes from '../hooks/api/useGetOtherAnimes';

const objNames = {
    animes: 'Animes',
    animesForCheckings: 'AnimesForCheckings',
    animesForWatchigns: 'AnimesForWatchings',
    animesStatistics: 'AnimesStatistics',
    pageMiddleware: 'PageMiddleware',
}

const AnimesCardWithoutTable = ({ navigation, route }) => {
    const [amount, setAmount] = useState(null)
    const [currentAmount, setCurrentAmount] = useState(null)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { height } = Dimensions.get('window')

    const PER_PAGE = 20
    let page = route.params ? route.params.page : 0
    const { name } = useGetOtherAnimes({
        page,
        route,
        PER_PAGE,
        setAmount,
        setData,
        setError,
        setLoading,
        setCurrentAmount
    })

    return (
        <>
            <ImageBackground source={levi} resizeMode="cover" style={{ flex: 1 }}>
                <Notifications
                    toggle={error}
                    top={50}
                    setToggle={setError}
                    time={3000}
                />
                <View style={style.content_inner}>
                {
                            amount && <TotalAmount totalAmount={amount} topSpace={60} />
                        }
                        {
                            currentAmount && <TotalAmount totalAmount={currentAmount} topSpace={110} color={'black'} backgroundColor={'rgba(50, 214, 47, 0.3)'} />
                        }
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
                                <View style={style.noData_inner(height)}>
                                    <NoData />
                                </View>
                            )
                        )
                    }
                </View>
                <Pagination
                    amount={amount}
                    perPage={PER_PAGE}
                    page={page}
                    objNames={objNames}
                    name={name}
                />
            </ImageBackground>
        </>
    )
}


const style = StyleSheet.create({
    content_inner: {
        flex: 1,
        // alignItems: 'center',
        position: 'relative',
        paddingTop: 50
    },
    noData_inner: (height) => ({
        alignItems: 'center',
        position: 'relative',
        height: height - 200
    })
})

export default AnimesCardWithoutTable