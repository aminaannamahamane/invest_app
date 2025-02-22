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
        private const string UserStocksCollection = "userStocks";

        // Inject Firestore dependency
        public FirebaseService(FirestoreDb firestoreDb)
        {
            _db = firestoreDb;
        }

        // 🚀 Add a new user
        public async Task AddUserAsync(UserModel user)
        {
            DocumentReference docRef = _db.Collection(UsersCollection).Document(user.Id);
            await docRef.SetAsync(user);
        }

        // 🚀 Retrieve a user
        public async Task<UserModel> GetUserAsync(string userId)
        {
            DocumentReference docRef = _db.Collection(UsersCollection).Document(userId);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
                return null;

            var user = snapshot.ConvertTo<UserModel>();

            // Adjust timestamps if necessary
            user.CreatedAt = snapshot.ContainsField("CreatedAt")
                ? snapshot.GetValue<Timestamp>("CreatedAt").ToDateTime()
                : DateTime.UtcNow;

            user.LastLogin = snapshot.ContainsField("LastLogin")
                ? snapshot.GetValue<Timestamp>("LastLogin").ToDateTime()
                : DateTime.UtcNow;

            return user;
        }

        // 🚀 Update user's last login timestamp
        public async Task UpdateLastLoginAsync(string userId)
        {
            DocumentReference docRef = _db.Collection(UsersCollection).Document(userId);
            await docRef.UpdateAsync("LastLogin", Timestamp.FromDateTime(DateTime.UtcNow));
        }

        // 🚀 Update user theme
        public async Task UpdateUserThemeAsync(string userId, string theme)
        {
            DocumentReference docRef = _db.Collection(UsersCollection).Document(userId);
            await docRef.UpdateAsync("Theme", theme);
        }

        // 🚀 Add a tuple (userId, stock) to the "userStocks" collection.
        // Each document will have two string fields: "UserId" and "StockName".
        public async Task AddUserStocksAsync(string userId, string stockName)
        {
            // Create a new document with an auto-generated ID
            DocumentReference docRef = _db.Collection(UserStocksCollection).Document();

            // Prepare the data with the two fields
            Dictionary<string, object> data = new Dictionary<string, object>
            {
                { "UserId", userId },
                { "StockName", stockName }
            };

            await docRef.SetAsync(data);
        }

        // 🚀 Retrieve all stocks (UserStock) for a given user
        public async Task<List<UserStock>> GetUserStocksAsync(string userId)
        {
            CollectionReference stocksCollection = _db.Collection(UserStocksCollection);
            Query query = stocksCollection.WhereEqualTo("UserId", userId);
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

            List<UserStock> stocks = new List<UserStock>();
            foreach (DocumentSnapshot doc in querySnapshot.Documents)
            {
                if (doc.Exists)
                {
                    var stock = doc.ConvertTo<UserStock>();
                    stocks.Add(stock);
                    Console.WriteLine($"Récupéré: doc.Id={doc.Id}, UserId={stock.UserId}, StockName={stock.StockName}");
                }
            }
            return stocks;
        }


        
        public async Task<string> AddUserAlertAsync(UserAlert alert)
        {
            CollectionReference alertsCollection = _db.Collection("userAlerts");
            DocumentReference docRef = alertsCollection.Document(); // Firestore génère l'ID

            alert.Id = docRef.Id; // Assigner l'ID généré
            await docRef.SetAsync(alert);

            return docRef.Id;
        }

        // 🚀 Retrieve all alerts for a given user
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

        // 🚀 Delete a user alert
        public async Task DeleteUserAlertAsync(string alertId)
        {
            DocumentReference docRef = _db.Collection(AlertsCollection).Document(alertId);
            await docRef.DeleteAsync();
        }

        // 🚀 Update the status of a user alert (e.g., active, triggered, disabled)
        public async Task UpdateUserAlertStatusAsync(string alertId, string status)
        {
            DocumentReference docRef = _db.Collection(AlertsCollection).Document(alertId);
            await docRef.UpdateAsync("Status", status);
        }
    }
}
