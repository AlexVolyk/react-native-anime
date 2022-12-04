import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native'

const Loading = () => {
  return (
    <View style={style.loading_inner}>
      <ActivityIndicator size={80} color={'black'} />
    </View>
  )
}

const style = StyleSheet.create({
  loading_inner: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '130%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    // top: -100
  }
})

export default Loading