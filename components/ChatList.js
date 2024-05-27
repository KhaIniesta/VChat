import { View, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

const ChatList = ({users, currentUser}) => {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <View className="flex-1 ">
      <FlatList
        data={users}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 == users.length}
            item={item}
            index={index}
            router={router}
            currentUser={currentUser}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
