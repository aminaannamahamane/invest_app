using Google.Cloud.Firestore;

namespace investbuddy.Server.Models
{
    [FirestoreData]
    public class UserStock
    {
        [FirestoreProperty]
        public string UserId { get; set; }
        
        [FirestoreProperty]
        public string StockName { get; set; }
    }
}
