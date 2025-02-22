using Google.Cloud.Firestore;

namespace investbuddy.Server.Models
{
    [FirestoreData]
    public class UserAlert
    {
        [FirestoreProperty]
        public string Id { get; set; } = null!;

        [FirestoreProperty]
        public string UserId { get; set; } = null!;

        [FirestoreProperty]
        public string AlertType { get; set; } = null!;

        [FirestoreProperty]
        public string StockName { get; set; } = null!;

        [FirestoreProperty]
        public string Operator { get; set; } = null!;

        [FirestoreProperty]
        public double Threshold { get; set; }

        [FirestoreProperty]
        public Timestamp CreatedAt { get; set; } = Timestamp.FromDateTime(DateTime.UtcNow);

        [FirestoreProperty]
        public Timestamp? TriggeredAt { get; set; } = null;

        [FirestoreProperty]
        public string Status { get; set; } = null!;

        // ✅ Ajout d'un constructeur vide pour éviter les erreurs d'instanciation
        public UserAlert() { }
    }
}
