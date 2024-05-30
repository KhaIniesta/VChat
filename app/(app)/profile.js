import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { tintColorLight } from "../../constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomKeyboardAdvoidingView from "../../components/CustomKeyboardAvoidingView";
import { useAuth } from "../../context/authContext";
import ProfileHeader from "../../components/ProfileHeader";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import profilePlaceholder from "../../constants/imagePlaceholder";

const Profile = () => {
  const { user, updatePasswordForUser, logout, updateUserNameAndProfileUrl } =
    useAuth(); // logged user
  const sentUser = useLocalSearchParams(); // second user
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const newPasswordRef = useRef("");
  const usernameRef = useRef("");
  const profileUrlRef = useRef("");

  const handleUpdate = async () => {
    handleUpdateUsernameAndProfileUrl();
  };

  const handleUpdateUsernameAndProfileUrl = async () => {
    if (!usernameRef.current) {
      Alert.alert("Username:", "Please fill username!");
      return;
    }
    if (!profileUrlRef.current) {
      Alert.alert("Username:", "Please fill profileUrl!");
      return;
    }
    setLoading(true);
    let response = await updateUserNameAndProfileUrl(
      user?.userId,
      usernameRef.current,
      profileUrlRef.current
    );
    setLoading(false);
    if (response.success) {
      Alert.alert(
        "Username and profileUrl",
        "Update Username and profileUrl success!",
        [
          {
            text: "OK",
            onPress: async () => {
              await logout();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Update Username and profileUrl fail!");
    }
  };

  const [addFriendText, setAddFriendText] = useState("Add friend");
  const sendFriendRequest = async (userId, userReqId) => {
    try {
      const userRef = doc(db, "users", userReqId);
      const reqFriendsRef = collection(userRef, "reqFriends");
      const newReqFriend = await addDoc(reqFriendsRef, {
        userReqId: userId,
      });
      setAddFriendText("Sent request");
      console.log("Friend request sent successfully", newReqFriend.id);
    } catch (e) {
      console.error("Error sending friend request: ", e);
    }
  };

  const isFriend = async (userId, friendId) => {
    try {
      const q = query(
        collection(db, `users/${userId}/friends`),
        where("userId", "==", friendId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        console.log("Da ket ban");
        return true;
      }
    } catch (e) {
      console.error("Error checking is friend: ", e);
    }
    console.log("Chua ket ban");
    return false;
  };

  const isSentAddFriendRequest = async (userId, friendId) => {
    try {
      const q = query(
        collection(db, `users/${friendId}/reqFriends`),
        where("userReqId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setAddFriendText("Sent request")
        return true;
      }
    } catch (e) {
      console.error("Error checking friend request: ", e);
    }
    return false;
  };

  const isReceivedAddFriendRequest = async (userId, friendId) => {
    try {
      const q = query(
        collection(db, `users/${userId}/reqFriends`),
        where("userReqId", "==", friendId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return true;
      }
    } catch (e) {
      console.error("Error checking friend request: ", e);
    }
    return false;
  };

  const [acceptFriendText, setAcceptFriendText] = useState("Accept");
  const acceptFriendRequest = async (userId, friendId) => {
    try {
      // Tạo batch để thực hiện các thay đổi cùng lúc
      const batch = writeBatch(db);
      // Thêm bạn vào sub-collection 'friends' của cả hai user
      const userFriendDocRef = doc(db, `users/${userId}/friends/${friendId}`);
      const friendUserDocRef = doc(db, `users/${friendId}/friends/${userId}`);
      batch.set(userFriendDocRef, { userId: friendId });
      batch.set(friendUserDocRef, { userId: userId });

      // Xóa yêu cầu kết bạn từ sub-collection 'reqFriends' của cả hai user
      const q = query(
        collection(db, `users/${userId}/reqFriends`),
        where("userReqId", "==", friendId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Thực hiện batch
      await batch.commit();
      setAcceptFriendText("Accepted");
      console.log("Friend request accepted successfully");
    } catch (e) {
      console.error("Error accepting friend request: ", e);
    }
  };
  //    Return  //////////////////////////////////////////////////////////////////////////////////
  // My profile
  const [isFriendStatus, setIsFriendStatus] = useState(false);
  const [isSentFriendRequestStatus, setIsSentFriendRequestStatus] = useState(false);
  const [isReceivedFriendRequestStatus, setIsReceivedFriendRequestStatus] = useState(false);


  useEffect(() => {
    setAddFriendText("Add friend")
    const checkFriendship = async () => {
      const friendStatus = await isFriend(user?.userId, sentUser?.userId);
      setIsFriendStatus(friendStatus);
    };
    const checkFriendRequest = async () => {
      const friendRequestStatus = await isSentAddFriendRequest(
        user?.userId,
        sentUser?.userId
      );
      setIsSentFriendRequestStatus(friendRequestStatus);
    };
    const checkReceivedFriendRequest = async () => {
      const friendReceivedStatus = await isReceivedAddFriendRequest(
        user?.userId,
        sentUser?.userId
      );
      setIsReceivedFriendRequestStatus(friendReceivedStatus);
    };

    checkFriendship();
    checkFriendRequest();
    checkReceivedFriendRequest();
  }, [user?.userId, sentUser?.userId]);

  if (user?.userId == sentUser?.userId) {
    usernameRef.current = user?.username;
    profileUrlRef.current = user?.profileUrl;

    return (
      <CustomKeyboardAdvoidingView>
        <StatusBar style="dark" />
        <ProfileHeader />
        <View
          className="flex-1 gap-10 bg-white"
          style={{ paddingTop: hp(2), paddingHorizontal: wp(5) }}
        >
          <View className="items-center">
            <Image
              style={{ height: hp(20), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={profilePlaceholder}
            />
            <Text style={{ fontSize: hp(4), fontWeight: 700, paddingTop: 10 }}>
              {user?.username}
            </Text>
          </View>
          <View className="gap-8 items-center">
            {/* username */}
            <View style={styles.textInput}>
              <Feather
                style={{ marginLeft: 8 }}
                name="user"
                size={hp(2.7)}
                color="gray"
              />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{ fontSize: hp(2), marginLeft: 8 }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder={user?.username}
                placeholderTextColor={"gray"}
              />
            </View>
            <View style={styles.textInput}>
              <Feather
                style={{ marginLeft: 8 }}
                name="image"
                size={hp(2.7)}
                color="gray"
              />
              <TextInput
                onChangeText={(value) => (profileUrlRef.current = value)}
                style={{ fontSize: hp(2), marginLeft: 8 }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder={user?.profileUrl}
                placeholderTextColor={"gray"}
              />
            </View>
          </View>
          {/* button */}
          <View>
            {
              <TouchableOpacity
                style={styles.changePasswordBtn}
                onPress={() => {
                  router.push("/(app)/changePassword");
                }}
              >
                <Text
                  className="font-medium text-neutral-500"
                  // style={{ color: "#fff", fontWeight: 800, fontSize: hp(2) }}
                >
                  Change Password
                </Text>
              </TouchableOpacity>
            }
          </View>
          <View>
            {
              <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                <Text
                  style={{ color: "#fff", fontWeight: 800, fontSize: hp(2) }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </CustomKeyboardAdvoidingView>
    );
  }
  // A friend profile(has send message button)
  if (isFriendStatus) {
    return (
      <CustomKeyboardAdvoidingView>
        <StatusBar style="dark" />
        <ProfileHeader />
        <View
          className="flex-1 gap-10 bg-white"
          style={{ paddingTop: hp(2), paddingHorizontal: wp(5) }}
        >
          <View className="items-center">
            <Image
              style={{ height: hp(20), aspectRatio: 1, borderRadius: 100 }}
              source={sentUser?.profileUrl}
              placeholder={profilePlaceholder}
            />
            <Text style={{ fontSize: hp(4), fontWeight: 700, paddingTop: 10 }}>
              {sentUser?.username}
            </Text>
          </View>
          {/* button */}
          <View>
            {
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => {
                  router.push({
                    pathname: "/(app)/chatRoom",
                    params: sentUser,
                  });
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: 800, fontSize: hp(2) }}
                >
                  Send messages
                </Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </CustomKeyboardAdvoidingView>
    );
  }
  // Sent a request to another user
  if (isSentFriendRequestStatus) {
    return (
      <CustomKeyboardAdvoidingView>
        <StatusBar style="dark" />
        <ProfileHeader />
        <View
          className="flex-1 gap-10 bg-white"
          style={{ paddingTop: hp(2), paddingHorizontal: wp(5) }}
        >
          <View className="items-center">
            <Image
              style={{ height: hp(20), aspectRatio: 1, borderRadius: 100 }}
              source={sentUser?.profileUrl}
              placeholder={profilePlaceholder}
            />
            <Text style={{ fontSize: hp(4), fontWeight: 700, paddingTop: 10 }}>
              {sentUser?.username}
            </Text>
          </View>
          {/* button */}
          <View>
            {
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => {
                  acceptFriendRequest(user?.userId, sentUser?.userId);
                }}
                disabled={addFriendText == "Sent request"}
              >
                <Text
                  style={{ color: "#fff", fontWeight: 800, fontSize: hp(2) }}
                >
                  {addFriendText}
                </Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </CustomKeyboardAdvoidingView>
    );
  }
  // received a add friend request 
  if (isReceivedFriendRequestStatus) {
    return (
      <CustomKeyboardAdvoidingView>
        <StatusBar style="dark" />
        <ProfileHeader />
        <View
          className="flex-1 gap-10 bg-white"
          style={{ paddingTop: hp(2), paddingHorizontal: wp(5) }}
        >
          <View className="items-center">
            <Image
              style={{ height: hp(20), aspectRatio: 1, borderRadius: 100 }}
              source={sentUser?.profileUrl}
              placeholder={profilePlaceholder}
            />
            <Text style={{ fontSize: hp(4), fontWeight: 700, paddingTop: 10 }}>
              {sentUser?.username}
            </Text>
          </View>
          {/* button */}
          <View>
            {
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => {
                  acceptFriendRequest(user?.userId, sentUser?.userId);
                }}
                disabled={acceptFriendText == "Accepted"}
              >
                <Text
                  style={{ color: "#fff", fontWeight: 800, fontSize: hp(2) }}
                >
                  {acceptFriendText}
                </Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </CustomKeyboardAdvoidingView>
    );
  }
  // Stranger:
  return (
    <CustomKeyboardAdvoidingView>
      <StatusBar style="dark" />
      <ProfileHeader />
      <View
        className="flex-1 gap-10 bg-white"
        style={{ paddingTop: hp(2), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            style={{ height: hp(20), aspectRatio: 1, borderRadius: 100 }}
            source={sentUser?.profileUrl}
            placeholder={profilePlaceholder}
          />
          <Text style={{ fontSize: hp(4), fontWeight: 700, paddingTop: 10 }}>
            {sentUser?.username}
          </Text>
        </View>
        {/* button */}
        <View>
          {
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={() => {
                sendFriendRequest(user?.userId, sentUser?.userId);
              }}
              disabled={addFriendText == "Sent request"}
            >
              <Text style={{ color: "#fff", fontWeight: 800, fontSize: hp(2) }}>
                {addFriendText}
              </Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    </CustomKeyboardAdvoidingView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    height: hp(6),
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  updateBtn: {
    borderRadius: 12,
    backgroundColor: tintColorLight,
    height: hp(6),
    justifyContent: "center",
    alignItems: "center",
  },
  changePasswordBtn: {
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    height: hp(6),
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Profile;
