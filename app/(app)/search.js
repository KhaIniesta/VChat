import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

const Search = () => {
  return (
    <View className="flex-1  items-center p-4">
        <TextInput placeholder="search by user name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-red-500"/>
    </View>
  );
};

export default Search;
