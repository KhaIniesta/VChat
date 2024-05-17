import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { tintColorDark, tintColorLight } from "../constants/Colors";

export const SearchHeader = () => {

  return (
    <View
      style={{ paddingTop: 48, backgroundColor: tintColorLight }}
      className="flex-row justify-between px-5 pb-6 rounded-b-3xl shadow"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Search
        </Text>
      </View>
    </View>
  );
};


export default SearchHeader;
