import { View, Text, Button, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../components/ChatList"
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { userRef } from '../../firebaseConfig';
import { tintColorLight } from '../../constants/Colors';
import { db } from '../../firebaseConfig';

const Home = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.uid) {
      getFriends(user.uid);
    }
  }, []);

  const getUsers = async() => {
    // Fetch users
    const q = query(userRef, where('userId', '!=', user?.uid))

    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach(doc => {
      data.push({...doc.data()})
    })
    setUsers(data)
  }

  // Hàm lấy thông tin chi tiết của một user từ userId
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
      const querySnapshot = await getDocs(friendsCollectionRef);
      
      const friends = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const friendId = doc.id;
        const friendData = await getUserById(friendId);
        return friendData;
      }));
  
      setUsers(friends)
    } catch (e) {
      console.error("Error fetching friends: ", e);
      setUsers([])
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

export default Home