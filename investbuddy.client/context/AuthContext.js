// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../src/firebaseConfig"; // 🔥 Import Firestore
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // 🔥 Import Firestore
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await saveUserToFirestore(currentUser); // 🔥 Ajoute l'utilisateur à Firestore

        // Récupérer et stocker le token dans un cookie nommé "token"
        const token = await currentUser.getIdToken();
        // Stockage du token pendant 1 jour, en mode sécurisé en production
        Cookies.set('token', token, { expires: 1, secure: process.env.NODE_ENV === 'production' });
      } else {
        // Si l'utilisateur se déconnecte, supprimer le cookie
        Cookies.remove('token');
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Fonction pour enregistrer l'utilisateur dans Firestore
  const saveUserToFirestore = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid); // 📌 Document avec l'UID de l'utilisateur
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
        console.log("🔥 Utilisateur ajouté à Firestore !");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout à Firestore :", error);
    }
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user); // 🔥 Sauvegarde Firestore après connexion
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      Cookies.remove('token'); // Supprimer le cookie lors de la déconnexion
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
