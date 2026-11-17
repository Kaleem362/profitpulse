import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyChZgnm3VgzpJCMl8rR16viW4usg_-xXOk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "profitpulse-3637c.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "profitpulse-3637c",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "profitpulse-3637c.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1049680579148",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1049680579148:web:edf5010cd5dd93d34b82e9",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-ZQ7G8KH1VQ",
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  try {
    db = getFirestore(app);
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  } catch (error) {
    console.warn("Firebase initialization note:", error);
  }
}

export { app, db, analytics };
