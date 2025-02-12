using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using investbuddy.Server.Models;

namespace investbuddy.Server.Services
{
    public class FirebaseService
    {
        private readonly FirestoreDb _db;
        private const string UsersCollection = "users";
        private const string AlertsCollection = "userAlerts";

        // 📌 Injection de dépendance Firestore
        public FirebaseService(FirestoreDb firestoreDb)
        {
            _db = firestoreDb;
        }

        // 🚀 Ajouter un utilisateur
        public async Task AddUserAsync(UserModel user)
        {
            DocumentReference docRef = _db.Collection(UsersCollection).Document(user.Id);
            await docRef.SetAsync(user);
        }

        // 🚀 Récupérer un utilisateur
        public async Task<UserModel> GetUserAsync(string userId)
        {
            DocumentReference docRef = _db.Collection(UsersCollection).Document(userId);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
                return null;

            var user = snapshot.ConvertTo<UserModel>();

            // 🔥 Correction des timestamps
            user.CreatedAt = snapshot.ContainsField("CreatedAt")
                ? snapshot.GetValue<Timestamp>("CreatedAt").ToDateTime()
                : DateTime.UtcNow;

            user.LastLogin = snapshot.ContainsField("LastLogin")
                ? snapshot.GetValue<Timestamp>("LastLogin").ToDateTime()
                : DateTime.UtcNow;

            return user;
        }

        // 🚀 Mettre à jour la date de dernière connexion
        public async Task UpdateLastLoginAsync(string userId)
        {
            DocumentReference docRef = _db.Collection(UsersCollection).Document(userId);
            await docRef.UpdateAsync("LastLogin", Timestamp.FromDateTime(DateTime.UtcNow));
        }

        // 🚀 Mettre à jour le thème de l'utilisateur
        public async Task UpdateUserThemeAsync(string userId, string theme)
        {
            DocumentReference docRef = _db.Collection(UsersCollection).Document(userId);
            await docRef.UpdateAsync("Theme", theme);
        }

        // 🚀 Ajouter une watchlist d’actions
        public async Task AddUserStocksAsync(string userId, List<string> stocks)
        {
            DocumentReference docRef = _db.Collection("userStocks").Document(userId);
            
            Dictionary<string, object> updateData = new Dictionary<string, object>
            {
                { "DefaultStocks", stocks }
            };

            await docRef.SetAsync(updateData, SetOptions.MergeAll);
        }

        // 🚀 Ajouter une alerte utilisateur
        public async Task AddUserAlertAsync(UserAlert alert)
        {
            DocumentReference docRef = _db.Collection("userAlerts").Document(alert.Id);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                alert.CreatedAt = Timestamp.FromDateTime(DateTime.UtcNow);
            }
            else
            {
                Timestamp createdAt = snapshot.ContainsField("CreatedAt")
                    ? snapshot.GetValue<Timestamp>("CreatedAt")
                    : Timestamp.FromDateTime(DateTime.UtcNow);

                alert.CreatedAt = createdAt;
            }

            Dictionary<string, object> alertData = new Dictionary<string, object>
            {
                { "Id", alert.Id },
                { "UserId", alert.UserId },
                { "AlertType", alert.AlertType },
                { "Condition", alert.Condition },
                { "Threshold", alert.Threshold },
                { "CreatedAt", alert.CreatedAt },
                { "TriggeredAt", alert.TriggeredAt.HasValue ? alert.TriggeredAt.Value : null },
                { "Status", alert.Status }
            };

            await docRef.SetAsync(alertData, SetOptions.MergeAll);
        }

        // 🚀 Récupérer toutes les alertes d'un utilisateur
        public async Task<List<UserAlert>> GetUserAlertsAsync(string userId)
        {
            Query query = _db.Collection(AlertsCollection).WhereEqualTo("UserId", userId);
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

            List<UserAlert> alerts = new List<UserAlert>();

            foreach (DocumentSnapshot snapshot in querySnapshot.Documents)
            {
                if (snapshot.Exists)
                {
                    var alert = snapshot.ConvertTo<UserAlert>();
                    alert.CreatedAt = snapshot.GetValue<Timestamp>("CreatedAt");
                    alert.TriggeredAt = snapshot.ContainsField("TriggeredAt") 
                        ? snapshot.GetValue<Timestamp>("TriggeredAt") 
                        : (Timestamp?)null;

                    alerts.Add(alert);
                }
            }

            return alerts;
        }

        // 🚀 Supprimer une alerte utilisateur
        public async Task DeleteUserAlertAsync(string alertId)
        {
            DocumentReference docRef = _db.Collection(AlertsCollection).Document(alertId);
            await docRef.DeleteAsync();
        }

        // 🚀 Mettre à jour l’état d’une alerte (ex: active, triggered, disabled)
        public async Task UpdateUserAlertStatusAsync(string alertId, string status)
        {
            DocumentReference docRef = _db.Collection(AlertsCollection).Document(alertId);
            await docRef.UpdateAsync("Status", status);
        }
    }
}
