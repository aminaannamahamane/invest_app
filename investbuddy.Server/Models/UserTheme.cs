using Google.Cloud.Firestore;

namespace investbuddy.Server.Models
{
    [FirestoreData]
    public class UserTheme
    {
        [FirestoreProperty]
        public string UserId { get; set; }

        [FirestoreProperty]
        public string Theme { get; set; }  // "dark" ou "light"
    }
}
