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
import profilePlaceholder from "../../constants/imagePlaceholder";

const ChangePassword = () => {
  const { user, updatePasswordForUser, logout, updateUserNameAndProfileUrl } =
    useAuth(); // logged user
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const passwordRef = useRef("");
  const newPasswordRef = useRef("");

  const handleUpdate = async () => {
    handleUpdatePassword();
  };

  const handleUpdatePassword = async () => {
    if (!passwordRef.current || !newPasswordRef.current) {
      Alert.alert("Password:", "Please fill all the required fields!");
      return;
    }
    setLoading(true);
    let response = await updatePasswordForUser(
      passwordRef.current,
      newPasswordRef.current
    );
    setLoading(false);
    if (response.success) {
      Alert.alert(
        "Password",
        "Update password success!",
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
      Alert.alert("Update password fail!");
    }
  };

  //    Return  //////////////////////////////////////////////////////////////////////////////////
  // My profile
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
              onChangeText={(value) => (newPasswordRef.current = value)}
              style={{ fontSize: hp(2), marginLeft: 8 }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="New password"
              secureTextEntry
              placeholderTextColor={"gray"}
            />
          </View>
        </View>
        {/* button */}
        <View>
          {
            <TouchableOpacity style={styles.signInBtn} onPress={handleUpdate}>
              <Text style={{ color: "#fff", fontWeight: 800, fontSize: hp(2) }}>
                Change Password
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

export default ChangePassword;
