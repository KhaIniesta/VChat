import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import SearchList from "../../components/searchList";
import firebase from "firebase/compat/app";
import { collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";


const Search = () => {
  const [searchString, getSearchString] = useState("");

  const getUsernamesBySearchString = (searchString) => {
    // const usersRef = collection(db, 'users');
    // return collection(db, 'users')
    // .where('username', 'array-contains', searchString)
    // .get()
    // .then(querySnapshot => {
    //   const usernames = [];
    //   querySnapshot.forEach(doc => usernames.push(doc.id));
    //   return usernames;
    // })
    // .catch(error => {
    //   console.error('Error getting usernames:', error);
    //   return [];
    // });
  }
  const loadSearchResult = () => {
    console.log(searchString);
    // get the username list by the typing
    const usersArr = getUsernamesBySearchString(searchString);
    
  }

  useEffect(() => {
    const TimeOutId = setTimeout(loadSearchResult, 500);
    return () => clearTimeout(TimeOutId);
  },[searchString])

  return (
    <View className="flex-1 items-center p-3 mt-2">
        <TextInput 
          onChangeText={value => setText(value)}
          style={{fontSize: 14}} 
          autoCapitalize="none" 
          placeholder="search by user name" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-red-500"/>
    </View>
  );
};

export default Search;
