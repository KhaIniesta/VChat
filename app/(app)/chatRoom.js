import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomKeyboardAvoidingView from "../../components/CustomKeyboardAvoidingView";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utils/common";
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
const ChatRoom = () => {
  const { user } = useAuth(); // logged user
  const item = useLocalSearchParams(); // second user
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef('')
  const inputRef = useRef(null)
  const scrollViewRef = useRef(null)

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId)
    const messagesRef = collection(docRef, "messages")
    const q = query(messagesRef, orderBy('createdAt', 'asc'))

    let unsub = onSnapshot(q, (snapshot) => {
        let allMessages = snapshot.docs.map(doc => {
            return doc.data()
        })
        setMessages([...allMessages])
    })

    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', updateScrollView
    )

    return () => {
      unsub()
      KeyboardDidShowListener.remove()
    }
  }, [item]);

  const updateScrollView = () => {
      scrollViewRef?.current.scrollToEnd({animated: true})
    setTimeout(() => {
    }, 100);
  }

  useEffect(() => {
    updateScrollView()
  }, [messages])

  const createRoomIfNotExists = async () => {
    //RoomId
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async() => {
    let message = textRef.current.trim()
    if (!message) return
    try {
        let roomId = getRoomId(user?.userId, item?.userId)
        const docRef = doc(db, 'rooms', roomId)
        const messagesRef = collection(docRef, "messages")
        textRef.current = ""
        if (inputRef) inputRef?.current?.clear()
        const newDoc = await addDoc(messagesRef, {
            userId: user?.userId,
            text: message,
            profileUrl: user?.profileUrl,
            senderName: user?.username,
            createdAt: Timestamp.fromDate(new Date())
        })

        console.log("New message id: ", newDoc.id)

    } catch(error) {
        Alert.alert("Message", error.message)
    }
  }

  return (
    <CustomKeyboardAvoidingView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
          </View>
          <View style={{ marginBottom: hp(1.5) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
              ref={inputRef}
                onChangeText={value=> textRef.current = value}
                placeholder="Type message ..."
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <TouchableOpacity
                onPress={handleSendMessage}
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
