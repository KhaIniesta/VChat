import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomKeyboardAvoidingView from "../../components/CustomKeyboardAvoidingView"
const ChatRoom = () => {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState();

  return (
    <CustomKeyboardAvoidingView inChat={true}>
        <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
            <View className="flex-1">
            <MessageList messages={messages} />
            </View>
            <View style={{ marginBottom: hp(1.5) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                <TextInput
                placeholder="Type message ..."
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
                />
                <TouchableOpacity
                style={{
                    backgroundColor: "#C2C2C2",
                    padding: 8,
                    marginRight: 1,
                    borderRadius: 9999,
                }}
                >
                <FontAwesome name="send" size={hp(3)} color={"#737373"} />
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </View>
    </CustomKeyboardAvoidingView>
  );
};

export default ChatRoom;
