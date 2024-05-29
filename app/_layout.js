import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext'
import { MenuProvider } from 'react-native-popup-menu';
import { auth } from '../firebaseConfig';

const MainLayout = () => {
  const { isAuthenticated, emailVerified, refreshUser } = useAuth();
  const segments = useSegments()
  const router = useRouter()
  useEffect(() => {
    // Check if user is authenticated or not
    if (typeof isAuthenticated == 'undefined') return 
    const inApp = segments[0] == '(app)'

    if (isAuthenticated && !inApp) {
      if (emailVerified == true) {
        // Redirect to Home
        router.replace('/home')
      }
      else {
        router.replace('/verifyEmail')
      }
    }
    else if (isAuthenticated == false) {
      // Redirect to Login
      router.replace('/signIn')
    }
  }, [isAuthenticated, emailVerified])

  useEffect(() => {
    let interval;
    if (isAuthenticated && !emailVerified) {
      interval = setInterval(async () => {
        await refreshUser();
        if (auth.currentUser.emailVerified) {
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAuthenticated, emailVerified]);

  return <Slot />
}

const RootLayout = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  )
}

export default RootLayout