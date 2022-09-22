import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";
import GestureRecognizer from 'react-native-swipe-gestures';


import Navigator from './components/navigation/Navigator';
import StatisticBlock from './StatisticBlock';
import Notifications from './components/notifications/Notifications';


export default function App() {
  const [toggle, setToggle] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const {isConnected, isInternetReachable, isWifiEnabled} = useNetInfo()

  function workToggle(e) {
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
  


  return (
    <GestureRecognizer onSwipeRight={workToggle} style={{flex: 1}}>
      <View style={styles.container}>
        {
          loaded && <Notifications toggle={error} setToggle={setError} />
        }
        <StatisticBlock toggle={toggle} setToggle={setToggle}/>
        <Navigator />
      </View>
    </GestureRecognizer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    color: 'red',
    position: 'relative'
  },
  text: {
    textAlign: 'center',
    color: "red",
  },
});
