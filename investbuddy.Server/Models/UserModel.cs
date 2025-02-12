using Google.Cloud.Firestore;
using System;

namespace investbuddy.Server.Models
{
    [FirestoreData]
    public class UserModel
    {
        [FirestoreProperty]
        public string Id { get; set; }

        [FirestoreProperty]
        public string Name { get; set; }

        [FirestoreProperty]
        public string Email { get; set; }

        [FirestoreProperty]
        public string Role { get; set; } = "basic";

        // 🔥 Correction : Utiliser `DateTime` au lieu de `Timestamp`
        [FirestoreProperty]
        public DateTime CreatedAt { get; set; }

        [FirestoreProperty]
        public DateTime LastLogin { get; set; }
    }

    
}
