// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging, Messaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr0aWM92orK80y0XCVhLsqRZFNiP67fcY",
  authDomain: "task-management-77408.firebaseapp.com",
  projectId: "task-management-77408",
  storageBucket: "task-management-77408.appspot.com",
  messagingSenderId: "159874062696",
  appId: "1:159874062696:web:2e9133d942da759d7a5edd",
  measurementId: "G-DLLKF3JHYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let messaging: Messaging;

  if (typeof window !== 'undefined'){
    messaging = getMessaging(app);
  }
    
  
export default db ;
