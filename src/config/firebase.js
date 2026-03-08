import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp4bXt3a3U8Gvp8iFJ7In_mCvUQheD6uQ",
  authDomain: "school-management-def90.firebaseapp.com",
  projectId: "school-management-def90",
  storageBucket: "school-management-def90.firebasestorage.app",
  messagingSenderId: "646576635968",
  appId: "1:646576635968:web:b435e8c701cb59cc029fa5",
  measurementId: "G-56GV40VJTG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);