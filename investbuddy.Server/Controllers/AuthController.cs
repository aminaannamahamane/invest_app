using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FirebaseAdmin.Auth;
using Google.Cloud.Firestore;
using investbuddy.Server.Models;

namespace investbuddy.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public AuthController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.IdToken))
            {
                return BadRequest(new { message = "Le champ idToken est requis." });
            }

            try
            {
                var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.IdToken);
                var uid = decodedToken.Uid;

                DocumentReference docRef = _firestoreDb.Collection("users").Document(uid);
                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

                UserModel user;
                string extractedName = decodedToken.Claims.ContainsKey("name") ? decodedToken.Claims["name"].ToString() : "Utilisateur inconnu";

                if (!snapshot.Exists)
                {
                    user = new UserModel
                    {
                        Id = uid,
                        Name = extractedName,
                        Email = decodedToken.Claims.ContainsKey("email") ? decodedToken.Claims["email"].ToString() : "unknown@example.com",
                        Role = "basic",
                        CreatedAt = Timestamp.FromDateTime(DateTime.UtcNow).ToDateTime(),
                        LastLogin = Timestamp.FromDateTime(DateTime.UtcNow).ToDateTime()
                    };
                    await docRef.SetAsync(user);
                }
                else
                {
                    user = snapshot.ConvertTo<UserModel>();

                    // 📌 Mise à jour du `Name` si Firestore contient "Unknown"
                    if (user.Name == "Unknown" || string.IsNullOrEmpty(user.Name))
                    {
                        user.Name = extractedName;
                        await docRef.UpdateAsync("Name", user.Name);
                    }

                    await docRef.UpdateAsync("LastLogin", Timestamp.FromDateTime(DateTime.UtcNow));
                }

                return Ok(user);
            }
            catch (FirebaseAuthException ex)
            {
                return Unauthorized(new { message = "Échec de l'authentification Firebase", error = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Erreur interne du serveur", error = ex.Message });
            }
        }
    }

    public class LoginRequest
    {
        public string IdToken { get; set; }
    }
}
