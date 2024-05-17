import { View, Text } from "react-native";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import blurhash from "../utils/common";
import { useAuth } from "../context/authContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuItem } from "./CustomMenuItem";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { tintColorLight } from "../constants/Colors";
import { router } from "expo-router";
import profilePlaceholder from "../constants/imagePlaceholder";

export const HomeHeader = () => {
  const { user, logout } = useAuth();
  const handleProfile = () => {
    // router.push('/(app)/profile')
    router.push({pathname: '/(app)/profile', params: user})
  }
  const handleLogout = async() => {
    await logout()
  }

  return (
    <View
      style={{ paddingTop: 40, backgroundColor: tintColorLight }}
      className="flex-row justify-between px-5 pb-6 rounded-b-3xl shadow"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Chats
        </Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger >
            <Image
              style={{ height: hp(5), aspectRatio: 1, borderRadius: 100 }}
              placeholder={profilePlaceholder}
              source={user?.profileUrl}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{
            optionsContainer: {
                borderRadius: 10,
                borderCurve: 'continuous',
                marginTop: 35,
                marginLeft: -20,
                backgroundColor: 'white',
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 0},
                width: 150
            }
          }}>
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(3)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text="Sign out"
              action={handleLogout}
              value={null}
              icon={<MaterialCommunityIcons name="logout" size={hp(3)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const Divider = () => {
    return (
        <View className="p-[1px] w-full bg-neutral-200"/>
    )
}

export default HomeHeader;
