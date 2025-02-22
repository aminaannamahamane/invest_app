import React from "react";
import { auth, googleProvider, db } from "@/firebaseConfig";// Import de Firestore
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

const GoogleLoginButton = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("Utilisateur connecté :", user);

      // 🔹 Référence du document Firestore
      const userRef = doc(db, "users", user.uid);

      // 🔹 Vérifier si l'utilisateur existe déjà
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // 🔹 Nouvel utilisateur → on crée son profil
        await setDoc(userRef, {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          role: "basic", // Par défaut
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
        console.log("Nouvel utilisateur ajouté à Firestore.");
      } else {
        // 🔹 Utilisateur existant → on met à jour la date de dernière connexion
        await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
        console.log("Dernière connexion mise à jour.");
      }

      // ✅ Message de bienvenue et redirection
      alert(`Bienvenue ${user.displayName} !`);
      router.push("/real-estate/account-info");

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn} variant="outline-danger w-100">
      <i className="fi-google fs-lg me-2"></i>
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
