import { View, Text, Image, TextInput, StyleSheet, TouchableHighlight} from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { tintColorLight } from '../constants/Colors'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <View className='flex-1'>
      <StatusBar style='dark'/>
      <View className='flex-1 gap-12' style={{paddingTop: hp(8), paddingHorizontal: wp(5)}}>
        <View className='items-center'>
          <Image style={{height: hp(25)}} resizeMode='contain' source={require('../assets/images/login-illustration.jpg')}/>
        </View>
          <View className='gap-10 items-center'>
            <Text style={{fontSize: hp(4), fontWeight: 700, marginVertical: 20}} >Sign In</Text>

            {/* input */}
            <View style={styles.textInput} >
              <Octicons style={{marginLeft: 8}} name='mail' size={hp(2.7)} color='gray'/>
              <TextInput
                style={{fontSize: hp(2), marginLeft: 8}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Email'
                placeholderTextColor={'gray'}/>
            </View>
            <View style={styles.textInput} >
              <Octicons style={{marginLeft: 8}} name='lock' size={hp(2.7)} color='gray'/>
              <TextInput
                style={{fontSize: hp(2), marginLeft: 8}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Password'
                placeholderTextColor={'gray'}/>
            </View>
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={{color: '#64748b', fontWeight: 500}}>Forgot password?</Text>
          </TouchableOpacity>
          {/* button */}
          <TouchableOpacity style={styles.signInBtn}>
            <Text style={{color: '#fff', fontWeight: 800, fontSize: hp(2)}}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.link}>
            <Text style={{color: '#64748b'}}>Don't have an account yet? </Text>
            <TouchableOpacity>
              <Link href={'/'} style={{color: '#64748b', fontWeight: '500', color: tintColorLight}}>Sign Up</Link>
            </TouchableOpacity>
          </View>
      </View>
    </View>
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
    marginTop: 20
  },
  forgotPassword: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 12
  },
  signInBtn: {
    borderRadius: 12,
    backgroundColor: tintColorLight,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
})

export default SignIn