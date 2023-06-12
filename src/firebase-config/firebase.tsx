// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtmZTAraaokQIco2pdNMlMB9HELnsq5IU",
  authDomain: "ticketsale-77d46.firebaseapp.com",
  projectId: "ticketsale-77d46",
  storageBucket: "ticketsale-77d46.appspot.com",
  messagingSenderId: "697216488030",
  appId: "1:697216488030:web:b6fccc4d2723ae195c5acf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);