import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { tintColorLight } from "../constants/Colors";

const ProfileHeader = () => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Entypo name="chevron-left" size={hp(4)} color={tintColorLight} />
            </Pressable>
          </View>
        ),
      }}
    />
  );
};

export default ProfileHeader;
