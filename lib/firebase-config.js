import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics"; // Import Analytics
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDhdZ1nqERWzVk6y3kumjWETsF5V6X3Wi0",
    authDomain: "smg-fantasy.firebaseapp.com",
    projectId: "smg-fantasy",
    storageBucket: "smg-fantasy.firebasestorage.app",
    messagingSenderId: "1066478840955",
    appId: "1:1066478840955:web:517ad12864b98b89dac6de",
    measurementId: "G-1DXT63P9CM" // Measurement ID is required for Analytics
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Analytics (ensure it's done only in the browser)
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

// Uncomment this if you need Firebase Storage
// const storage = getStorage(app);

export { auth, analytics }; // Export Analytics if needed