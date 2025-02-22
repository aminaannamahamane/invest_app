import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createAlert } from "../../server/Services/alertService";


const CreateAlertForm = () => {
  const { user } = useAuth();
  const [alertType, setAlertType] = useState("price");
  const [condition, setCondition] = useState("");
  const [threshold, setThreshold] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Vous devez être connecté pour créer une alerte.");
      return;
    }

    try {
      await createAlert(user.uid, alertType, condition, parseFloat(threshold));
      alert("Alerte créée avec succès !");
      setCondition("");
      setThreshold("");
    } catch (error) {
      alert("Erreur lors de la création de l'alerte.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <h3>Créer une alerte</h3>
      <div className="mb-3">
        <label className="form-label">Type d'alerte</label>
        <select
          className="form-select"
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
        >
          <option value="price">Prix</option>
          <option value="sentiment">Sentiment</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Condition</label>
        <input
          type="text"
          className="form-control"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="Ex: if AAPL < 150"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Seuil</label>
        <input
          type="number"
          className="form-control"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Ajouter une alerte
      </button>
    </form>
  );
};

export default CreateAlertForm;
