import { View, Text, Image, TextInput, StyleSheet, TouchableHighlight, Alert, ActivityIndicator} from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { tintColorLight } from '../constants/Colors'
import { useRouter } from 'expo-router'
import CustomKeyboardAdvoidingView from '../components/CustomKeyboardAvoidingView'
import { useAuth } from '../context/authContext'

const SignIn = () => {
  const router = useRouter();
  const {login} = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async() => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign in', 'Please fill all the fields!');
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    console.log('sign in response: ', response);
    setLoading(false);
    if(!response.success) {
      Alert.alert('Sign In', response.msg);
    }
  }
  return (
    <CustomKeyboardAdvoidingView>
      <StatusBar style='dark'/>
      <View className='flex-1 gap-12' style={{paddingTop: hp(8), paddingHorizontal: wp(5)}}>
        <View className='items-center'>
          <Image style={{height: hp(25)}} resizeMode='contain' source={require('../assets/images/VChatLogo.png')}/>
        </View>
          <View className='gap-10 items-center'>
            <Text style={{fontSize: hp(4), fontWeight: 700}} >Sign In</Text>
            {/* input */}
            <View style={styles.textInput} >
              <Octicons style={{marginLeft: 8}} name='mail' size={hp(2.7)} color='gray'/>
              <TextInput
                onChangeText={value=> emailRef.current=value}
                style={{fontSize: hp(2), marginLeft: 8}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Email'
                placeholderTextColor={'gray'}/>
            </View>
            <View style={styles.textInput} >
              <Octicons style={{marginLeft: 8}} name='lock' size={hp(2.7)} color='gray'/>
              <TextInput
                onChangeText={value=> passwordRef.current=value}
                style={{fontSize: hp(2), marginLeft: 8}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Password'
                secureTextEntry
                placeholderTextColor={'gray'}/>
            </View>
          </View>
          <TouchableOpacity style={styles.forgotPassword} >
            <Text style={{color: '#64748b', fontWeight: 500}}>Forgot password?</Text>
          </TouchableOpacity>
          {/* button */}
          <View>
            {
              loading? (
                  <View >
                    <ActivityIndicator size='large' color={tintColorLight}></ActivityIndicator>
                  </View>
              ):
              (
                <TouchableOpacity style={styles.signInBtn} onPress={handleLogin}>
                  <Text style={{color: '#fff', fontWeight: 800, fontSize: hp(2)}}>Sign in</Text>
                </TouchableOpacity>
              )
            }
          </View>
          <View style={styles.link}>
            <Text style={{color: '#64748b'}}>Don't have an account yet? </Text>
            <TouchableOpacity onPress={()=>{ router.push('/signUp') }}>
              <Text  style={{color: '#64748b', fontWeight: '500', color: tintColorLight}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </View>
    </CustomKeyboardAdvoidingView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    height: hp(6),
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  forgotPassword: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  signInBtn: {
    borderRadius: 12,
    backgroundColor: tintColorLight,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
})

export default SignIn