import { View, Pressable, Text } from 'react-native'
import React, { useState, useCallback  } from 'react'
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../components/ChatList"
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const user = auth.currentUser; 
  const [users, setUsers] = useState([]);

  const getUserById = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (e) {
      console.error("Error fetching user: ", e);
      return null;
    }
  };

  const getFriends = async (userId) => {
    try {
      const friendsCollectionRef = collection(db, `users/${userId}/friends`);
      onSnapshot(friendsCollectionRef, async (querySnapshot) => {
        const friends = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const friendId = doc.id;
          const friendData = await getUserById(friendId);
          return friendData;
        }));
    
        setUsers(friends);
      });
    } catch (e) {
      console.error("Error fetching friends: ", e);
      setUsers([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.uid) {
        console.log(`load users ne hihi`)
        getFriends(user.uid);
      }
    }, [])
  );


  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Text>No friends</Text>
        </View>
      )}
    </View>
  );
}

export default Home