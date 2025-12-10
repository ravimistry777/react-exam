import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv2a2wO6c1kmCUKYX9l5FlCQ52Jh5OBII",
  authDomain: "react-exam-hotel.firebaseapp.com",
  projectId: "react-exam-hotel",
  storageBucket: "react-exam-hotel.firebasestorage.app",
  messagingSenderId: "857321730026",
  appId: "1:857321730026:web:a7cf12ee522e48da61cc93"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);