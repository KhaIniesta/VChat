import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import SearchList from "../../components/searchList";
import firebase from "firebase/compat/app";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { tintColorLight } from "../../constants/Colors";
import { useAuth } from "../../context/authContext";

const Search = () => {
  const { user } = useAuth();
  const [searchString, setSearchString] = useState("");
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const getUsernamesBySearchString = async() => {
    console.log("search string: " + searchString);
    setIsTyping(false);
    if(searchString.length == 0) return;

    const usersRef = await collection(db, "users");
    const q = query(usersRef, where("username", ">=", searchString), where("username", "<=",searchString + "\uf8ff"));
    const querySnapshot = await getDocs(q);

    let matchingUsers = [];
    querySnapshot.forEach((doc) => {
      matchingUsers.push(doc.data());
    });
    
    setUsers(matchingUsers);
  }
  const getAllUsers = async() => {
    const userRef = collection(db, 'users')
    const q = query(userRef, where('userId', '!=', auth.currentUser?.uid))

    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach(doc => {
      data.push({...doc.data()})
    })
    setUsers(data)
  }

  useEffect(() => {
    // setUsers([]);
    getAllUsers()
    setIsTyping(true);

    const TimeOutId = setTimeout(getUsernamesBySearchString, 500);
    return () => clearTimeout(TimeOutId);
  },[searchString])

  return (
    <View className="flex-1 items-center p-3 mt-2">
        <TextInput 
          onChangeText={value => setSearchString(value)}
          style={{fontSize: 14}} 
          autoCapitalize="none" 
          placeholder="Search by user name" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-red-500"/>
          <View className="w-full flex-1 mt-3">
            {
              isTyping? (
                  <View className="w-full flex-1 justify-center">
                    <ActivityIndicator size='large' color={tintColorLight}></ActivityIndicator>
                  </View>
              ):
              (
                <SearchList users={users}/>
              )
            }
          </View>
    </View>
  );
};

export default Search;
