import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDPOJDHIsTCR3LFoCQrvMJMjctJaPgTcw",
  authDomain: "metalyplast-577ac.firebaseapp.com",
  projectId: "metalyplast-577ac",
  storageBucket: "metalyplast-577ac.appspot.com",
  messagingSenderId: "62914405985",
  appId: "1:62914405985:web:b435e8975f47a115492c20"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)