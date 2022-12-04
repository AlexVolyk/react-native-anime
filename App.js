import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import GestureRecognizer from 'react-native-swipe-gestures';

import Navigator from './components/navigation/Navigator';
import StatisticBlock from './StatisticBlock';
import Notifications from './components/notifications/Notifications';
import ReduxProvider from './redux/ReduxProvider';
import { useDispatch } from 'react-redux';
import { initSettings } from './redux/settings';


// const Aboba = ({ children }) => {
//   // const dispatch = useDispatch()

//   // useEffect(() => {
//   //   dispatch(initSettings())
//   // }, [])

//   return (
//     { children }
//   )
// }
export default function App() {
  const [toggle, setToggle] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const { isConnected, isInternetReachable, isWifiEnabled } = useNetInfo()
  // const dispatch = useDispatch()

  function workToggle(e) {
    // console.log('sdadsaasd');
    if (e.moveY > 20 && e.moveY < 220) {
      // console.log(e)
      setToggle(true)

    }
  }

  useEffect(() => {
    // if (!isConnected && isConnected !== null || !isWifiEnabled && isWifiEnabled !== null && !isInternetReachable) {
    if (!isInternetReachable) {
      setError("No Internet Connection")
    } else {
      setError(false)
    }
    if (!loaded) {
      setTimeout(() => {
        setLoaded(true)
      }, 1000)
    }

  }, [isConnected, isInternetReachable, isWifiEnabled])

  // useEffect(() => {
  //   dispatch(initSettings())
  // }, [])



  return (
    <ReduxProvider>
      <GestureRecognizer onSwipeRight={workToggle} style={{ flex: 1 }}>
        <StatusBar 
        // translucent={false}
        translucent={true}
        // showHideTransition='fade'
        backgroundColor={'transparent'}
        // barStyle='transparant'
        />
        <View style={styles.container}>
          {/* <View style={{
            position: 'absolute',
            height: 100,
            width: 300,
            zIndex: 10,
            backgroundColor: 'red'
          }}> */}
            {/* <Text>abab</Text>
            <Text>abab</Text>
            <Text>abab</Text>
            <Text>abab</Text>
            <Text>abab</Text>
            <Text>abab</Text> */}
            <StatisticBlock toggle={toggle} setToggle={setToggle} />

            {/* </View> */}
          {
            loaded && <Notifications toggle={error} setToggle={setError} />
          }
          {/* <StatisticBlock toggle={toggle} setToggle={setToggle} /> */}
          {/* <Aboba> */}
          <Navigator />
          {/* </Aboba> */}
        </View>
      </GestureRecognizer>
    </ReduxProvider>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // height: 500,
    color: 'red',
    position: 'relative',
    // zIndex: 1
  },
  text: {
    textAlign: 'center',
    color: "red",
  },
});
