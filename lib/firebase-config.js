import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDhdZ1nqERWzVk6y3kumjWETsF5V6X3Wi0",
    authDomain: "smg-fantasy.firebaseapp.com",
    projectId: "smg-fantasy",
    storageBucket: "smg-fantasy.firebasestorage.app",
    messagingSenderId: "1066478840955",
    appId: "1:1066478840955:web:517ad12864b98b89dac6de",
    measurementId: "G-1DXT63P9CM"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
// const storage = getStorage(app);

export { auth };