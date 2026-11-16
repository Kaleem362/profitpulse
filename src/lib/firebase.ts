import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "profitpulse-dev.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "profitpulse-dev",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "profitpulse-dev.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

// Initialize Firebase only if in client or valid config
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
    console.warn("Firebase initialization notice:", error);
  }
}

export { app, db, analytics };

