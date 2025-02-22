import { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; 

const UserAlerts = () => {
  const { user } = useAuth(); 
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchAlerts = async () => {
      try {
        const q = query(collection(db, "userAlerts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedAlerts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAlerts(fetchedAlerts);
      } catch (error) {
        console.error("Erreur de récupération des alertes :", error);
      }
    };

    fetchAlerts();
  }, [user]);

  return (
    <div>
      <h2>📢 Mes Alertes</h2>
      {alerts.length === 0 ? (
        <p>Aucune alerte trouvée.</p>
      ) : (
        <ul>
          {alerts.map(alert => (
            <li key={alert.id}>
              <strong>Type :</strong> {alert.alertType} <br />
              <strong>Condition :</strong> {alert.condition} <br />
              <strong>Seuil :</strong> {alert.threshold} <br />
              <strong>Status :</strong> {alert.status} <br />
              <small>🕒 Créé le : {new Date(alert.createdAt.toDate()).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAlerts;
