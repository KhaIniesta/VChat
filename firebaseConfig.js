// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { collection, getFirestore } from "firebase/firestore";
import {firebaseApiKey} from "../VChat/firebaseApiKey"

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "vchat-1b18d.firebaseapp.com",
  projectId: "vchat-1b18d",
  storageBucket: "vchat-1b18d.appspot.com",
  messagingSenderId: "864940793997",
  appId: "1:864940793997:web:d54917a12237a20dbdc2c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);
export const userRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');