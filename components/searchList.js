import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";
import SearchItem from "./searchItem";

const SearchList = ({users}) => {
  const router = useRouter()
  return (
    <View className="flex-1 ">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        // keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SearchItem
            item={item}
            index={index}
            router={router}
          />
        )}
      />
    </View>
  );
};
export default SearchList;