// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "flashcardapp-e6ac1.firebaseapp.com",
  projectId: "flashcardapp-e6ac1",
  storageBucket: "flashcardapp-e6ac1.appspot.com",
  messagingSenderId: "469053670767",
  appId: "1:469053670767:web:9a97401444e1911890549a",
  measurementId: "G-7TC20VL4Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}