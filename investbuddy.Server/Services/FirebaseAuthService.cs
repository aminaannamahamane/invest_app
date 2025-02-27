using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using System;
using System.Threading.Tasks;

namespace investbuddy.Server.Services
{
    public class FirebaseAuthService
    {
        private readonly FirestoreDb _firestoreDb;

        public FirebaseAuthService()
        {
            if (FirebaseApp.DefaultInstance == null)
            {
                FirebaseApp.Create(new AppOptions
                {
                    Credential = GoogleCredential.FromFile("firebase-config.json")
                });
            }
            _firestoreDb = FirestoreDb.Create("investbuddy-dc991");
        }

        public async Task<FirebaseToken?> VerifyToken(string token)
        {
            try
            {
                return await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Token verification failed: " + ex.Message);
                return null;
            }
        }
    }
}
