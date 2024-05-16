import React from 'react'
import { Stack } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'
import ProfileHeader from '../../components/ProfileHeader'
import "../../global.css"
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name='home'
        options={{
          header: () => <HomeHeader /> 
        }}
      />
    </Stack>
  )
}

export default _layout