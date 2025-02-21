import { db } from "../src/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/**
 * Crée une alerte et l'ajoute à Firestore.
 * @param {string} userId - L'ID de l'utilisateur qui crée l'alerte.
 * @param {string} alertType - Type d'alerte (ex: "price", "sentiment").
 * @param {string} condition - Description de la condition (ex: "if AAPL < 150").
 * @param {number} threshold - Valeur seuil qui déclenche l'alerte.
 */
export const createAlert = async (userId, alertType, condition, threshold) => {
  try {
    const docRef = await addDoc(collection(db, "userAlerts"), {
      userId,
      alertType,
      condition,
      threshold,
      createdAt: Timestamp.now(),
      triggeredAt: null, // L'alerte n'a pas encore été déclenchée
      status: "active", // Statut par défaut
    });
    console.log("Alerte ajoutée avec ID :", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la création de l'alerte :", error);
    throw error;
  }
};
