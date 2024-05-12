import { View, Text, Button, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../components/ChatList"


const Home = () => {
  const {logout, user} = useAuth();
  const [users, setUsers] = useState([1, 2, 3])
  useEffect(() => {
    if (user?.uid) {
      getUsers()
    }
  }, [])

  const getUsers = async() => {
    // Fetch users
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' />
      {
        users.length > 0? (
          <ChatList users={users}/>
        ) : (
          <View className='flex items-center' style={{top: hp(30)}}>
            <ActivityIndicator size="large" />
          </View>
        )
      }

    </View>
  )
}

export default Home