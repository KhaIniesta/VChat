import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React, { Children } from 'react'
import { ScrollView } from 'react-native'

export default function CustomKeyboardAvoidingView({children, inChat}) {
  let kavConfig = {}
  let scrollViewConfig = {}
  if (inChat) {
    kavConfig = {keyboardVerticalOffset: 90}
    scrollViewConfig = {contentContainerStyle: {flex: 1}}
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      {...kavConfig}
    >
        <ScrollView
          style={{flex: 1}}
          bounces={false}
          {...scrollViewConfig}
          showsVerticalScrollIndicator={false}
        >
          {
            children
          }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}