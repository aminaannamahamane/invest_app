using Google.Cloud.Firestore;
using System.Collections.Generic;

namespace investbuddy.Server.Models
{
    [FirestoreData]
    public class UserStock
    {
        [FirestoreProperty]
        public string UserId { get; set; }

        [FirestoreProperty]
        public List<string> DefaultStocks { get; set; }
    }

    
}
