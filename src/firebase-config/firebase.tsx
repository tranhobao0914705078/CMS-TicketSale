// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqCCqdDyUuw_GMaCfuzjSoxB-peyWKOko",
  authDomain: "cmsticketsale.firebaseapp.com",
  projectId: "cmsticketsale",
  storageBucket: "cmsticketsale.appspot.com",
  messagingSenderId: "935211913912",
  appId: "1:935211913912:web:88867bca2adc6447851a4d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);