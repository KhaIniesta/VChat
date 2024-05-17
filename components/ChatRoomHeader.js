import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { Image } from 'expo-image';
import { tintColorLight } from '../constants/Colors';
import profilePlaceholder from '../constants/imagePlaceholder';

const ChatRoomHeader = ({user, router}) => {
    return (
        <Stack.Screen 
            options={{
                title: '',
                headerShadowVisible: false, 
                headerLeft: () => (
                    <View className="flex-row items-center gap-4">
                        <Pressable onPress={() => {router.back()}}>
                            <Entypo name='chevron-left' size={hp(4)} color={tintColorLight} />
                        </Pressable>
                        <View className="flex-row items-center gap-3">
                            <Image 
                                placeholder={profilePlaceholder}
                                source={user?.profileUrl}
                                style={{height: hp(5), aspectRatio: 1, borderRadius: 100}}
                            />
                            <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-semibold">
                                {user?.username}
                            </Text>
                        </View>
                    </View>
                ),
                headerRight: () => (
                    <View className="flex-row items-center gap-8 p-3">
                        <Ionicons name='call' size={hp(3)} color={tintColorLight} />
                        <FontAwesome5 name='info-circle' size={hp(3)} color={tintColorLight} />
                    </View>
                )
            }}
        />
    )
}

export default ChatRoomHeader