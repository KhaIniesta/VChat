import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import SearchItem from "./searchItem";
import {tintColorLight} from '../constants/Colors'

const SearchList = ({users}) => {
  const router = useRouter()
  return (
    <View className={`flex-1 w-full p-3 rounded-2xl mt-3 bg-neutral-200`} >
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SearchItem
            noBorder={index + 1 == users.length}
            user={item}
            index={index}
            router={router}
          />
        )}
      />
    </View>
  );
};
export default SearchList;