import React, { useEffect, useState } from 'react'
import {
    Button,
    FlatList,
    TextInput,
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Keyboard,
    Text
} from 'react-native'
import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as _ from 'lodash'
import levi from '../assets/levi.jpg'

import AnimeCardWith from '../components/card/anime-card-with/AnimeCardWith';
import Pagination from '../components/pagination/Pagination'
import Loading from '../components/loading/Loading';
import NoData from '../components/noData/NoData';
import Notifications from '../components/notifications/Notifications';
import FilterBlock from '../components/filter/filter-block/FilterBlock';
import AmounInfo from '../components/amount-info/AmounInfo';

import useGetNameForApi from '../hooks/useGetNameForApi';
import useGetAnimes from '../hooks/api/useGetAnimes'
import useSearchAnimes from '../hooks/api/useSearchAnimes'
// import Filter from '../components/filter/Filter';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch, useSelector } from 'react-redux';
// import { initSettings } from '../redux/settings';
// import StatisticBlock from '../StatisticBlock';
import { ANIME } from '../redux/constant';

// import user_set_up from '../assets/user_set_up.json'


const objNames = {
    animes: 'Animes',
    animesForCheckings: 'AnimesForCheckings',
    animesForWatchigns: 'AnimesForWatchings',
    animesStatistics: 'AnimesStatistics',
    pageMiddleware: 'PageMiddleware',
}


const AnimesCardWithTable = ({ navigation, route }) => {

    // let setting = useSelector(state => state.settings)
    // const dispatch = useDispatch()
    // console.log(setting, 'settingsettingsettingsetting');

    // useEffect(() => {
    //     dispatch(initSettings())
    // }, [])

    // function canShow() {
    //     let value = AsyncStorage.getItem('submitSearch')
    //     // let value =  !AsyncStorage.getItem('submitSearch')
    //     // console.log( AsyncStorage.getItem('submitSearch'), '++++++++++++++++');
    //     if (value == 'true') {
    //         value = true
    //     }
    //     else {
    //         value = false

    //     }

    //     return value

    // }

    // let can = canShow()
    // const [isSearchSubmit, setIsSearchSubmit] = useState(can)

    // console.log(isSearchSubmit, 'isSearchSubmit');

    // useEffect(() => {
    //     setIsSearchSubmit(can)
    //     console.log('new one=======', can);
    // }, [can])

    const [data, setData] = useState([])
    // const [amount, setAmount] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)
    const [currentAmount, setCurrentAmount] = useState(null)
    const [prevCurrentAmount, setPrevCurrentAmount] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [v, setV] = useState('')
    const [buttonToggle, setButtonToggle] = useState(false)
    const [filterToggle, setFilterToggle] = useState(false)
    const [perPage, setPerPage] = useState(null)
    // console.log(navigation, 'nav');
    const { height } = Dimensions.get('window')
    const { name } = useGetNameForApi(route)

    let title = route?.params?.title
    // console.log(title, 'title');
    // title && setFilterToggle(false)
    let page = route.params ? route.params.page : 0
    // console.log(totalAmount, 'totalAmount');
    // console.log(currentAmount, 'currentAmount');

    // console.log(route, 'routeeeeee');
    // console.log(page, 'page');

    useGetAnimes({
        page,
        title,
        route,
        setData,
        setLoading,
        setError,
        // setAmount,
        setTotalAmount,
        v,
        setCurrentAmount,
        setPrevCurrentAmount,
        setPerPage,
    })
    const { refetch } = useSearchAnimes({ v, setLoading, setError, navigation })


    useEffect(() => {
        if (title) {
            // console.log('sadasass');
            setFilterToggle(false)
        }
    }, [title])


    function getName() {
        Keyboard.dismiss()
        refetch()
        setButtonToggle(false)

    }

    const rStyleHeight = useAnimatedStyle(() => {
        const height = interpolate(buttonToggle, [false, true], [0, 50])
        const marginBottom = interpolate(buttonToggle, [false, true], [0, 10])
        const opacity = interpolate(buttonToggle, [false, true], [0, 1])


        return {
            height: withTiming(height),
            marginBottom: withTiming(marginBottom),
            opacity: withTiming(opacity)


        }
    })


    function swipeLeftDetector(e) {
        // console.log(e.moveX, 'moveX');
        if (e.moveY > 100 && e.moveY < 660) {
            if (e.moveX > 195 && e.moveX < 400) {
                // console.log('yee done to true')
                // console.log(e.moveX, 'moveX');

                // console.log(e.moveY, 'moveY');
                if (!title) {
                    setFilterToggle(prev => !prev)

                }

            }

        }
    }

    function swipeRightDetector(e) {
        console.log('sssssssssssssssssssssssssssssssssssssssssss');
        // console.log(e.moveX, 'moveX');
        // if (e.moveY > 50 && e.moveY < 660) {
        // console.log(e.moveX, 'moveX');

        // console.log(e.moveY, 'moveY');
        // // if (e.moveX > 300 && e.moveX < 400) {
        //     console.log('fuck')
        //     // setToggle(true)
        //     setFilterToggle(false)

        // }

        // }
    }
    return (
        <>
            <GestureRecognizer
                onSwipeLeft={swipeLeftDetector}
                // onSwipeRight={swipeRightDetector}
                // onSwipeUp={swipeRightDetector}

                style={{ flex: 1 }}
            >
                <ImageBackground source={levi} resizeMode="cover" style={{
                    flex: 1,
                    height: height + 30,
                    position: 'relative',
                }}>
                    <FilterBlock
                        toggle={filterToggle}
                        setToggle={setFilterToggle}
                        pathName={ANIME}
                    />

                    <Notifications
                        toggle={error}
                        setToggle={setError}
                        time={3000}
                    />



                    <View
                        style={style.content_inner(height)}
                    //  style={{
                    //     // position: 'relative',
                    //     // height: height + 30
                    //     // !:::::::!SS1!!!!WSSSSS
                    //     height
                    // }}
                    >
                        {
                            // isSearchSubmit && 
                            false &&
                            <View style={{ zIndex: 2, position: 'relative' }}>

                                <View style={{
                                    backgroundColor: 'rgba(34,36,40,1)', position: 'absolute', width: '100%',
                                }}>
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

                            </View>
                        }
                        {/* <View style={{ zIndex: 2, position: 'relative' }}>

                            <View style={{
                                backgroundColor: 'rgba(34,36,40,1)', position: 'absolute', width: '100%',
                            }}>
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

                        </View> */}

                        <View style={{
                            flex: 1,
                            // alignItems: 'center',
                            position: 'relative',
                        }}>
                            <TextInput
                                placeholderTextColor="grey"
                                value={v}
                                onChangeText={(e) => {
                                    setV(e)
                                    if (buttonToggle === false) {
                                        setButtonToggle(true)
                                    }
                                }}
                                style={style.input}
                                placeholder="Назва аніме"
                                keyboardType="web-search"
                                onSubmitEditing={getName}
                            />
                            <AmounInfo
                                totalAmount={totalAmount}
                                currentAmount={currentAmount}
                                prevCurrentAmount={prevCurrentAmount}
                            />
                            {/* {
                                totalAmount && currentAmount && <View style={{

                                }}>

                                    {
                                        totalAmount && <TotalAmount totalAmount={totalAmount} />
                                    }
                                    {
                                        currentAmount && <TotalAmount totalAmount={currentAmount} prevCurrentAmount={prevCurrentAmount} topSpace={60} color={'black'} backgroundColor={'rgba(50, 214, 47, 0.3)'} />
                                    }
                                </View>
                            } */}
                            {
                                loading ? (<>
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
                                                // data={data.slice(6,7)}
                                                data={data}
                                                renderItem={({ item }) =>
                                                    <AnimeCardWith item={item} key={item._id} />
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
                            title={title}
                        />
                    </View>
                </ImageBackground>
            </GestureRecognizer>
        </>
    )
}

const style = StyleSheet.create({
    content_inner: (height) => ({
        height: height + 30
        // height
    }),
    input: {
        // position: 'relative',
        // marginTop: 44,
        // marginTop: 44,
        marginTop: 35,
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
        overflow: 'hidden',
        // zIndex: 3
    },
    button_inner: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
    }
})

export default AnimesCardWithTable