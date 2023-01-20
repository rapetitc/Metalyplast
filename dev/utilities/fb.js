// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDPOJDHIsTCR3LFoCQrvMJMjctJaPgTcw",
  authDomain: "metalyplast-577ac.firebaseapp.com",
  projectId: "metalyplast-577ac",
  storageBucket: "metalyplast-577ac.appspot.com",
  messagingSenderId: "62914405985",
  appId: "1:62914405985:web:b435e8975f47a115492c20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage()