import { View, Text, Image, TextInput, StyleSheet, TouchableHighlight, Alert, ActivityIndicator} from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { tintColorLight } from '../constants/Colors'
import { useRouter } from 'expo-router'
import CustomKeyboardAdvoidingView from '../components/CustomKeyboardAvoidingView'
import { useAuth } from '../context/authContext'

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {register} = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileUrlRef = useRef("");


  const handleRegister = async() => {
    if(!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign up', 'Please fill all the required fields!');
      return;
    }

    setLoading(true)
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileUrlRef.current)
    setLoading(false)
    console.log('got result: ', response);
    if(!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  }
  return (
    <CustomKeyboardAdvoidingView>
      <StatusBar style='dark'/>
      <View className='flex-1 gap-10' style={{paddingTop: hp(8), paddingHorizontal: wp(5)}}>
        <View className='items-center'>
          <Image style={{height: hp(25)}} resizeMode='contain' source={require('../assets/images/VChatLogo.png')}/>
        </View>
          <View className='gap-8 items-center'>
            <Text style={{fontSize: hp(4), fontWeight: 700, marginVertical: 20}} >Sign Up</Text>

            {/* email */}
            <View style={styles.textInput} >
              <Octicons style={{marginLeft: 8}} name='mail' size={hp(2.7)} color='gray'/>
              <TextInput
                onChangeText={value=> emailRef.current=value}
                style={{fontSize: hp(2), marginLeft: 8}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Email'
                placeholderTextColor={'gray'}/>
            </View>
            {/* username */}
            <View style={styles.textInput} >
              <Feather style={{marginLeft: 8}} name='user' size={hp(2.7)} color='gray'/>
              <TextInput
                onChangeText={value=> usernameRef.current=value}
                style={{fontSize: hp(2), marginLeft: 8}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='User name'
                placeholderTextColor={'gray'}/>
            </View>
            {/* password */}
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
            {/* re-type password */}
            {/* <View style={styles.textInput} >
              <Octicons style={{marginLeft: 8}} name='lock' size={hp(2.7)} color='gray'/>
              <TextInput
                onChangeText={value=> passwordRef.current=value}
                style={{fontSize: hp(2), marginLeft: 8}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Re-type password'
                secureTextEntry
                placeholderTextColor={'gray'}/>
            </View> */}
            {/* image */}
            <View style={styles.textInput} >
              <Feather style={{marginLeft: 8}} name='image' size={hp(2.7)} color='gray'/>
              <TextInput
                onChangeText={value=> profileUrlRef.current=value}
                style={{fontSize: hp(2), marginLeft: 8}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Image'
                placeholderTextColor={'gray'}/>
            </View>
          </View>
          {/* button */}
          <View>
            {
              <TouchableOpacity style={styles.signInBtn} onPress={handleRegister}>
                <Text style={{color: '#fff', fontWeight: 800, fontSize: hp(2)}}>Sign up</Text>
              </TouchableOpacity>
            }
          </View>
          {/* <View>
            {
              loading? (
                  <View style={{paddingTop: 20}}>
                    <ActivityIndicator size='large' color={tintColorLight}></ActivityIndicator>
                  </View>
              ):
              (
                <TouchableOpacity style={styles.signInBtn} onPress={handleRegister}>
                  <Text style={{color: '#fff', fontWeight: 800, fontSize: hp(2)}}>Sign up</Text>
                </TouchableOpacity>
              )
            }
          </View> */}
          <View style={styles.link}>
            <Text style={{color: '#64748b'}}>Already have an account? </Text>
            <TouchableOpacity onPress={()=>{ router.push('/signIn') }}>
              <Text  style={{color: '#64748b', fontWeight: '500', color: tintColorLight}}>Sign In</Text>
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

export default SignUp