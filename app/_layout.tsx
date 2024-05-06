import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import "../global.css"

const _layout = () => {
  return (
    <View>
      <Slot/>
    </View>
  )
}

export default _layout