import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCndbfhMU4TkS7nGVARnN2tJpJx9QholQ4",
  authDomain: "investbuddy-dc991.firebaseapp.com",
  projectId: "investbuddy-dc991",
  storageBucket: "investbuddy-dc991.firebasestorage.app",
  messagingSenderId: "30458103782",
  appId: "1:30458103782:web:060d28e55da23a18b27827",
  measurementId: "G-GMSVNX8F8Y"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);  // 🔥 Ajout de Firestore

export { auth, googleProvider, db };  
