// investbuddy.client/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCndbfhMU4TkS7nGVARnN2tJpJx9QholQ4",
  authDomain: "investbuddy-dc991.firebaseapp.com",
  projectId: "investbuddy-dc991",
  storageBucket: "investbuddy-dc991.firebasestorage.app",
  messagingSenderId: "30458103782",
  appId: "1:30458103782:web:060d28e55da23a18b27827"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
