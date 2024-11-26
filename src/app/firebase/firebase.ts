// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase,ref,set,serverTimestamp,get,child,remove } from "firebase/database"; // Realtime Database
import { getMessaging, Messaging } from "firebase/messaging";

// Import dotenv for environment variables (used in server-side scenarios)
require("dotenv").config();

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  databaseURL: "https://task-management-77408-default-rtdb.firebaseio.com"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Realtime Database
const realtimeDb = getDatabase(app);

// Firebase Messaging for Push Notifications
let messaging: Messaging;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export { db, realtimeDb, messaging ,ref, set,serverTimestamp,get,child,remove};
