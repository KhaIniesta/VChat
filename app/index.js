import { View, Text, ActivityIndicator, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import React from "react";
import { tintColorLight } from "../constants/Colors";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
        <Image style={{height: hp(25)}} resizeMode='contain' source={require('../assets/images/VChatLogo.png')}/>
        <Text style={{color: tintColorLight, fontWeight: 800, fontSize: hp(5), marginVertical: 20, fontFamily: 'Roboto'}}>VChat</Text>
        <ActivityIndicator size="large" color={tintColorLight} />
    </View>
  );
};

export default StartPage;
