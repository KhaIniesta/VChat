import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from 'expo-image'
import { blurhash, formatDate, getRoomId } from "../utils/common";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import profilePlaceholder from "../constants/imagePlaceholder";

const ChatItem = ({ item, router, noBorder, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(undefined)

  useEffect(() => {
    let roomId = getRoomId(currentUser?.uid, item?.userId);
    const docRef = doc(db, "rooms", roomId)
    const messagesRef = collection(docRef, "messages")
    const q = query(messagesRef, orderBy('createdAt', 'desc'))

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
          return doc.data()
      })
      setLastMessage(allMessages[0]? allMessages[0]: null)
    })

  }, []);

  const openChatRoom = async() => {
    console.log('check var lap lai chat item')
    router.push({pathname: '/(app)/chatRoom', params: item})
  }
  
  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt
      return formatDate(new Date(date?.seconds*1000))
    }
  }

  const renderLastMessage  = () => {
    if (typeof lastMessage == 'undefined') return 'Loading ...'
    
    if (lastMessage) {
      if (currentUser?.userId == lastMessage?.userId) return 'You: ' + lastMessage?.text 
      return lastMessage?.text
    }
    else {
      return 'Say hello 👋'
    }
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
        placeholder={profilePlaceholder}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-neutral-600">{item?.username}</Text>
          <Text className="font-medium text-neutral-400">{renderTime()}</Text>
        </View>
        <Text className="font-medium text-neutral-400">{renderLastMessage()}</Text>
      </View>
    </Pressable>
  );
};

export default ChatItem;
