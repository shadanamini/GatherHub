import { useState, useEffect, createContext, useContext } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  //Put firebase config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

//Function to signup
export function signup(email, password) {
    setDoc(doc(db, 'Users', email), {
        teams: []
    });
    return createUserWithEmailAndPassword(auth, email, password);
}

//Function to logout
export function logout() {
    return signOut(auth);
}

//Function to login
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

//Rest Password function
export function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
}

//User context to allow every page to access user
const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,user => {setCurrentUser(user)})
        return unsub;
    },[])

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    )

}

export function useCurrentUser() {
    return useContext(UserContext);
}