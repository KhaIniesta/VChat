import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from 'expo-image'
import { blurhash } from "../utils/common";

const ChatItem = ({ item, router, noBorder }) => {
  const openChatRoom = async() => {
    router.push({pathname: '/chatRoom', params: item})
  }
  
  return (
    <Pressable onPress={openChatRoom}
      className={`flex-row justify-between mx-4 items-center gap-3  mb-4 pb-2 ${
        noBorder ? "" : "border-b border-neutral-300"
      }`}
    >
      <Image 
        style={{ height: hp(6), width: hp(6), borderRadius: 100}}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-neutral-600">{item?.username}</Text>
          <Text className="font-medium text-neutral-400">Time</Text>
        </View>
        <Text className="font-medium text-neutral-400">Last message</Text>
      </View>
    </Pressable>
  );
};

export default ChatItem;
