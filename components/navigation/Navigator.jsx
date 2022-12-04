import React, { createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Anime from '../../page/Anime';
import AnimesCardWithTable from '../../page/AnimeCardWtihTable';
import AnimesCardWithoutTable from '../../page/AnimeCardWithoutTable';
import { useSharedValue } from 'react-native-reanimated';
// import AnimesStatistics from './statistic/AnimesStatistics';

const objNames = {
    animes: 'Animes',
    animesForCheckings: 'AnimesForCheckings',
    animesForWatchigns: 'AnimesForWatchings',
    animesStatistics: 'AnimesStatistics',
    pageMiddleware: 'PageMiddleware',
}

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
export const containerRef = createRef();

const AnimeCardWithTableNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='Animess' component={AnimesCardWithTable} />
            <Stack.Screen name='Anime' component={Anime} />
        </Stack.Navigator>
    )
}


export default function Navigator() {


    return (
        <>
            <NavigationContainer ref={containerRef}>
                <Tab.Navigator
                    defaultScreenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName='Animes'
                    screenOptions={({ route, navigation }) => ({
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ focused, color, size }) => {
                            // console.log(focused, navigation);
                            size = 26
                            let iconName;
                            if (route.name === objNames.animesForCheckings) {
                                iconName = focused ? 'calendar' : 'calendar-outline';
                            } else if (route.name === objNames.animes) {
                                iconName = focused ? 'albums' : 'albums-outline';
                            } else if (route.name === objNames.animesForWatchigns) {
                                iconName = focused ? 'eye' : 'eye-outline';
                            } else if (route.name === objNames.animesStatistics) {
                                iconName = focused ? 'ios-pie-chart' : 'ios-pie-chart-outline';
                            }

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },

                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            padding: 0,
                            paddingHorizontal: 5,
                            paddingTop: 0,
                            backgroundColor: 'rgba(34,36,40,0.8)',
                            position: 'absolute',
                            borderTopWidth: 0,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            elevation: 30,
                        },
                    })
                    }
                >
                    <Tab.Screen name={objNames.animes} component={AnimeCardWithTableNavigation} options={options('green')} listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            // console.log('e');
                            // console.log(route.state.routes[0].params,'rrrrr');
                            if (route.state && route?.state?.routes[0]?.params?.title) {
                                // console.log('aaa');
                                navigation.navigate('Animess')
                            }
                        },
                    })} />
                    <Tab.Screen name={objNames.animesForWatchigns} component={AnimesCardWithoutTable}
                        options={options('orange')}
                    // listeners={({ navigation, route }) => ({
                    //     tabPress: e => {
                    //         // console.log('e');
                    //         // console.log(route.state.routes[0].params,'rrrrr');
                    //         if (route.state && route?.state?.routes[0]?.params?.title) {
                    //             // console.log('aaa');
                    //             navigation.navigate(objNames.animesForWatchigns)
                    //         }
                    //     },
                    // })}

                    />
                    <Tab.Screen name={objNames.animesForCheckings} component={AnimesCardWithoutTable}
                        options={options('orange')}
                    // listeners={({ navigation, route }) => ({
                    //     tabPress: e => {
                    //         // console.log('e');
                    //         // console.log(route.state.routes[0].params,'rrrrr');
                    //         if (route.state && route?.state?.routes[0]?.params?.title) {
                    //             // console.log('aaa');
                    //             navigation.navigate(objNames.animesForCheckings)
                    //         }
                    //     },
                    // })}
                    />
                    {/* <Tab.Screen name={objNames.animesForWatchigns} component={AnimesCardWithoutTable}
                        options={options('orange')} /> */}
                    {/* <Tab.Screen name={objNames.animesStatistics} component={AnimesStatistics} options={options('orange')} /> */}
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}

const options = (color) => ({
    headerTitleAlign: 'center',
    headerTintColor: color,
    headerShown: false,
    headerStyle: {
        backgroundColor: 'rgba(34,36,40,1)'
    }
})