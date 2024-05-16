import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { tintColorLight } from "../../constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomKeyboardAdvoidingView from "../../components/CustomKeyboardAvoidingView";
import { useAuth } from "../../context/authContext";
import ProfileHeader from "../../components/ProfileHeader";

const Profile = () => {
  const { user } = useAuth(); // logged user
  const sendedUser = useLocalSearchParams(); // second user
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileUrlRef = useRef("");

  const handleUpdate = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert("Sign up", "Please fill all the required fields!");
      return;
    }

    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileUrlRef.current
    );
    setLoading(false);
    console.log("got result: ", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  //    Return  //////////////////////////////////////////////////////////////////////////////////
  // My profile
  if (user?.userId == sendedUser?.userId) {
    console.log(`Check user's profile\nMy id: ${user?.userId},\nSendedUser's id: ${sendedUser?.userId}`)
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
              source={require("../../assets/images/avt_messi.jpg")}
            />
            <Text style={{ fontSize: hp(4), fontWeight: 700, paddingTop: 10 }}>
              minhkha27
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
            {/* password */}
            <View style={styles.textInput}>
              <Octicons
                style={{ marginLeft: 8 }}
                name="lock"
                size={hp(2.7)}
                color="gray"
              />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2), marginLeft: 8 }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={"gray"}
              />
            </View>
            {/* re-type password */}
            <View style={styles.textInput}>
              <Octicons
                style={{ marginLeft: 8 }}
                name="lock"
                size={hp(2.7)}
                color="gray"
              />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2), marginLeft: 8 }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Re-type password"
                secureTextEntry
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
              <TouchableOpacity style={styles.signInBtn} onPress={handleUpdate}>
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
  else if (false) {
  }
  // A stranger profile(has Add friend button)
  else {
  }
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
  signInBtn: {
    borderRadius: 12,
    backgroundColor: tintColorLight,
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
