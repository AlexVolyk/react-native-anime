import React, { useState } from 'react'
import {
    Button,
    FlatList,
    TextInput,
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Keyboard
} from 'react-native'
import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as _ from 'lodash'
import levi from '../assets/levi.jpg'

import AnimeCardWith from '../components/card/anime-card-with/AnimeCardWith';
import Pagination from '../components/pagination/Pagination'
import TotalAmount from '../components/TotalAmount';
import Loading from '../components/loading/Loading';
import NoData from '../components/noData/NoData';
import Notifications from '../components/notifications/Notifications';

import useGetNameForApi from '../hooks/useGetNameForApi';
import useGetAnimes from '../hooks/api/useGetAnimes'
import useSearchAnimes from '../hooks/api/useSearchAnimes'


const objNames = {
    animes: 'Animes',
    animesForCheckings: 'AnimesForCheckings',
    animesForWatchigns: 'AnimesForWatchings',
    animesStatistics: 'AnimesStatistics',
    pageMiddleware: 'PageMiddleware',
}

const AnimesCardWithTable = ({ navigation, route }) => {
    const [data, setData] = useState([])
    const [amount, setAmount] = useState(null)
    const [currentAmount, setCurrentAmount] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [v, setV] = useState('')
    const [toggle, setToggle] = useState(false)
    // console.log(navigation, 'nav');
    const { height } = Dimensions.get('window')
    const { name } = useGetNameForApi(route)
    const PER_PAGE = 20

    let title = route?.params?.title
    let page = route.params ? route.params.page : 0

    // console.log(route, 'routeeeeee');
    // console.log(page, 'page');

    useGetAnimes({
        page,
        title,
        route,
        PER_PAGE,
        setData,
        setLoading,
        setError,
        setAmount,
        v,
        setCurrentAmount
    })
    const { refetch } = useSearchAnimes({ PER_PAGE, v, setLoading, setError, navigation })



    function getName() {
        Keyboard.dismiss()
        refetch()
        setToggle(false)

    }

    const rStyleHeight = useAnimatedStyle(() => {
        const height = interpolate(toggle, [false, true], [0, 50])
        return {
            height: withTiming(height)
        }
    })

    return (
        <>
            <ImageBackground source={levi} resizeMode="cover" style={{
                flex: 1,
                height: height + 49,
                position: 'relative'
            }}>
                <Notifications
                    toggle={error}
                    setToggle={setError}
                    time={3000}
                />
                <View style={{ backgroundColor: 'rgba(34,36,40,1)' }}>
                    <TextInput
                        placeholderTextColor="grey"
                        value={v}
                        onChangeText={(e) => {
                            setV(e)
                            if (toggle === false) {
                                setToggle(true)
                            }
                        }}
                        style={style.input}
                        placeholder="Назва аніме"
                        keyboardType="web-search"
                        onSubmitEditing={getName}
                    />
                    <Animated.View style={[style.button_container, rStyleHeight]}>
                        <View
                            style={style.button_inner}
                        >
                            <Button
                                title="Підтвердити"
                                onPress={getName}
                                color='purple'
                            />
                        </View>
                    </Animated.View>
                </View>
                <View style={{
                    height: height - 61
                }}>
                    <View style={{
                        flex: 1,
                        // alignItems: 'center',
                        position: 'relative',
                    }}>
                        {
                            amount && <TotalAmount totalAmount={amount} />
                        }
                        {
                            currentAmount && <TotalAmount totalAmount={currentAmount} topSpace={60} color={'black'} backgroundColor={'rgba(50, 214, 47, 0.3)'} />
                        }
                        {
                            loading ? (<>
                                <Loading />
                                <View style={{ flex: 1 }} />
                            </>
                            ) : (
                                data.length > 0 && !loading ? (
                                    <>
                                        {/* <View style={{
                                    height: height - 50
                                }}> */}

                                        <FlatList
                                            contentContainerStyle={{
                                                alignItems: 'center',
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            initialNumToRender={1}
                                            // data={data.slice(6,7)}
                                            data={data}

                                            renderItem={({ item }) =>
                                                <AnimeCardWith item={item} key={item._id} />
                                            }
                                        />
                                        {/* <Pagination
                                        amount={amount}
                                        perPage={PER_PAGE}
                                        page={page}
                                        objNames={objNames}
                                        name={name}
                                        title={title}
                                    /> */}
                                        {/* </View> */}
                                    </>
                                ) : (
                                    <View style={{
                                        alignItems: 'center',
                                        position: 'relative',
                                        height: height - 200
                                    }}>
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
                        title={title}
                    />
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    input: {
        marginTop: 44,
        marginBottom: 15,
        marginHorizontal: 8,
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        borderRadius: 10,
        color: 'white',
    },
    button_container: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
    },
    button_inner: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
    }
})

export default AnimesCardWithTable