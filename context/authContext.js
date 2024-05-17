import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile as firebaseUpdateProfile, getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider} from "firebase/auth"
import {auth, db} from "../firebaseConfig"
import {doc, setDoc, getDoc} from "firebase/firestore"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        // On authStateChanged
        const unsub = onAuthStateChanged(auth, (user)=> {
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid)
           } else {
                setIsAuthenticated(false);
                setUser(null);
           }
        })
        return unsub;
    }, []);

    const updateUserData = async(userId) => {
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            let data = docSnap.data()
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
        }
    }

    const login = async(email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true}
        } catch(e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email')) msg='Invalid email'
            if(msg.includes('(auth/invalid-credential')) msg='Wrong credentials'
            return {success: false, msg}
        }
    }

    const logout = async() => {
        try {
            await signOut(auth);
            return {success: true}
        } catch(e) {
            return {success: false, msg: e.message, error: e};
        }
    }

    const register = async(email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user: ', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user}
        } catch(e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email')) msg = 'Invalid email';
            if(msg.includes('(auth/email-already-in-use')) msg = 'This email is already in use';
            return {success: false, msg: msg}
        }
    }

    const updateProfile = async (newDisplayName, newPhotoURL) => {
        const user = auth.currentUser;
        if (user) {
            try {
                await firebaseUpdateProfile(user, {
                    displayName: newDisplayName,
                    photoURL: newPhotoURL
                });
                await setDoc(doc(db, "users", user.uid), {
                    username: newDisplayName,
                    profileUrl: newPhotoURL,
                    userId: user.uid
                }, { merge: true });
                setUser((prevUser) => ({
                    ...prevUser,
                    displayName: newDisplayName,
                    photoURL: newPhotoURL
                }));
                return { success: true };
            } catch (e) {
                return { success: false, msg: e.message, error: e };
            }
        } else {
            return { success: false, msg: 'No user is signed in' };
        }
    };

    const updatePasswordForUser = async (currentPassword, newPassword) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            // Xác thực lại người dùng
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            try {
                await reauthenticateWithCredential(currentUser, credential);
                // Cập nhật mật khẩu
                await updatePassword(currentUser, newPassword);
                console.log('Password updated successfully');
                return { success: true };
            } catch (error) {
                console.error('Error updating password:', error);
                return { success: false, message: error.message };
            }
        } else {
            return { success: false, message: 'No user is signed in' };
        }
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout, updateProfile, updatePasswordForUser}}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider')
    }
    return value;
}
