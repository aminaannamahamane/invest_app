using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using investbuddy.Server.Services; // ✅ Ajoute ceci

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

var app = builder.Build();

app.UseRouting();
app.UseAuthentication();  // 🚀 Active l'authentification Firebase
app.UseAuthorization();

// ✅ 🚀 S'assurer que les contrôleurs sont bien mappés
app.MapControllers();

app.Run();
