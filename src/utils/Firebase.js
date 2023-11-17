import { useState, useEffect, createContext, useContext } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8OQ5oYlpu1V83S9jeYmvHw_EXAzkwCR4",
    authDomain: "gatherhub-d80b7.firebaseapp.com",
    projectId: "gatherhub-d80b7",
    storageBucket: "gatherhub-d80b7.appspot.com",
    messagingSenderId: "333338889543",
    appId: "1:333338889543:web:a9ac07b60e3c2fda4f5062",
    measurementId: "G-DZNJ2TBCP9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

//Function to signup
export async function signup(username, email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'Users', auth.currentUser.uid), {
        username: username,
        email: email,
        attending: []
    }, { merge: true });
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

//Add conference
export function createConference(name, date, location, numAttendees) {
    setDoc(doc(db, 'Conferences', makeid(10)), {
        name: name,
        date: date,
        location: location,
        maxAttendees: numAttendees,
        attendees: [],
        events: []
    }, { merge: true });
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
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