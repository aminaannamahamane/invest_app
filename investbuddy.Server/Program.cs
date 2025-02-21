using System.IO;
using System.Threading.Tasks;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using investbuddy.Server.Services; // ✅ Ajoute ceci
using investbuddy.Server.Models; // ✅ Ajoute cec

var builder = WebApplication.CreateBuilder(args);

// 📌 Définir la variable d’environnement pour Firebase
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",
    @"C:\Users\adjma\OneDrive\Documents\Adjmal\uOttawa\Winter 2025\final project\investbuddy\InvestBuddy\investbuddy.Server\firebase-config.json");

// 🚀 Initialisation de Firebase
FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.GetApplicationDefault()
});

// 🔧 Ajouter Firestore comme service singleton
builder.Services.AddSingleton(FirestoreDb.Create("investbuddy-dc991"));

// 📌 Ajouter FirebaseService (🔥 C'est la correction)
builder.Services.AddSingleton<FirebaseService>();

// ✅ Ajouter les services Auth et Authorization
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/investbuddy-dc991";
        options.Audience = "investbuddy-dc991";
    });

builder.Services.AddAuthorization();

// ✅ 🚀 Ajouter les services pour les contrôleurs
builder.Services.AddControllers();

// Initialisation de firebase
string pathjson = Path.Combine(AppContext.BaseDirectory, "firebase-config.json");
builder.Services.AddSingleton(FirebaseApp.Create("investbuddy-dc991"));

var app = builder.Build();

// Ajouter les alertes automatiquement 
app.MapGet("/alertes", async (FirestoreDb db) =>
{   
    var docRef = db.Collection("UserAlert").Document("alerte1");
    await docRef.SetAsync(new {Id= "alert1", UserId = "user1", AlertType = "type1", Condition = "condition1", Threshold = 100.0, Status = "status1" });
    return "donnée inseré dans firebase"; 
});


//lire les alertes 
app.MapGet("/alertes/{id}", async (FirestoreDb db, string id) =>
{
    var docRef = db.Collection("UserAlert").Document(id);
    DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
    if (!snapshot.Exists)
    {
        return Results.NotFound ("alerte non trouvé");
        
    }
    var alert = snapshot.ConvertTo<UserAlert>();
    return Results.Ok(alert);
});

app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthentication();  // 🚀 Active l'authentification Firebase
app.UseAuthorization();

// ✅ 🚀 S'assurer que les contrôleurs sont bien mappés
app.MapControllers();

app.Run();
