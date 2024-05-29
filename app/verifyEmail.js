import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const EmailVerified = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Check your email and verify to login.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  text: {
    fontSize: 16, 
    textAlign: 'center'
  }
});

export default EmailVerified;
