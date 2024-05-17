import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from 'expo-image'
import { blurhash, formatDate, getRoomId } from "../utils/common";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { tintColorLight } from "../constants/Colors";

const SearchItem = ({ user, router, noBorder}) => {

  const openProfile = async () => {
    router.push({pathname: '/profile', params: user});
  }

  return (
    <Pressable onPress={openProfile} className="flex-row items-center gap-3 mb-4 pb-2 p-2 rounded-lg"
    style={{backgroundColor: tintColorLight}}>
      <Image 
        style={{ height: hp(6), width: hp(6), borderRadius: 100}}
        source={user?.profileUrl}
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-neutral-100 text-xl pl-2">{user?.username}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchItem;
