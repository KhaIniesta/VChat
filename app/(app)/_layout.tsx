import React from 'react'
import { Stack, Tabs } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'
import SearchHeader from '../../components/SearchHeader'
import ProfileHeader from '../../components/ProfileHeader'
import "../../global.css"
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { tintColorDark, tintColorLight } from '../../constants/Colors'

const _layout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: tintColorLight }}>
      <Tabs.Screen 
        name='home'
        options={{
          title : "Chats",
          header: () => <HomeHeader />,
          tabBarIcon: ({ color }) => <MaterialIcons name="message" size={24} color={color} />,
          
        }}
      />
      <Tabs.Screen 
        name='search'
        options={{
          title : "Search",
          header: () => <SearchHeader />,
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color}/>,

        }}
      />
      <Tabs.Screen 
        name='profile'
        options={{
          href : null,
        }}
      />
      <Tabs.Screen 
        name='chatRoom'
        options={{
          href : null,
          tabBarStyle: {display: 'none'}
        }}
      />
      <Tabs.Screen 
        name='changePassword'
        options={{
          href : null,
        }}
      />
    </Tabs>
  )
}

export default _layout