import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { Children } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function CustomKeyboardAdvoidingView({children}) {
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{flex: 1}}
    >
        <ScrollView
          style={{flex: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}