import { View, Text, ActivityIndicator, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import React from "react";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
        <Image style={{height: hp(25)}} resizeMode='contain' source={require('../assets/images/VChatLogo.png')}/>
    </View>
  );
};

export default StartPage;
