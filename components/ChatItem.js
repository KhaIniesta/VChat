import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ChatItem = ({ item, router, noBorder }) => {
  return (
    <Pressable
      className={`flex-row justify-between mx-4 items-center gap-3  mb-4 pb-2 ${
        noBorder ? "" : "border-b border-neutral-300"
      }`}
    >
      <Image
        source={require("../assets/images/avt_messi.jpg")}
        style={{ height: hp(6), width: hp(6) }}
        className="rounded-full"
      />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-neutral-600">Minh Kha</Text>
          <Text className="font-medium text-neutral-400">Minh Kha</Text>
        </View>
        <Text className="font-medium text-neutral-400">Last message</Text>
      </View>
    </Pressable>
  );
};

export default ChatItem;
