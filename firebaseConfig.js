// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAii1yChtEAQ_l13_1zger-X2z__SYjFsg",
//   authDomain: "vchatapp-73f4c.firebaseapp.com",
//   projectId: "vchatapp-73f4c",
//   storageBucket: "vchatapp-73f4c.appspot.com",
//   messagingSenderId: "971209238649",
//   appId: "1:971209238649:web:c21241c33eda2b2dfacca8",
//   measurementId: "G-SSD5CE8RC9"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAMvbe4_AuO9xFk_1hbpBpPto8B0x0YkqI",
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