require('dotenv').config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGAzNyugAwzkXdt3ccQis7KaBDK3ngPhk",
  authDomain: "touchworld-7c4b5.firebaseapp.com",
  projectId: "touchworld-7c4b5",
  storageBucket: "touchworld-7c4b5.appspot.com",
  messagingSenderId: "1088234694929",
  appId: "1:1088234694929:web:47fa8e0322045ed44844b0",
  measurementId: "G-314J3X5B7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);