import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

const Home = () => {
  const {logout, user} = useAuth();

  const handleLogout = async() => {
    await logout();
  }

  console.log("User data: ", user)

  return (
    <View className='flex-1 bg-white'>
      <Text>Home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  )
}

export default Home