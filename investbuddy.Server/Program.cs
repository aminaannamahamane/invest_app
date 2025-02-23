using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using investbuddy.Server.Services;
using investbuddy.Server.Middleware;

var builder = WebApplication.CreateBuilder(args);

// 📌 Définir la variable d’environnement pour Firebase
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "firebase-config.json");

// Initialisation de Firebase (Attention, si FirebaseApp est créé ici, il ne faut pas le recréer dans FirebaseAuthService)
FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.GetApplicationDefault()
});

// Ajouter Firestore comme service singleton
builder.Services.AddSingleton(FirestoreDb.Create("investbuddy-dc991"));

// Ajouter FirebaseService
builder.Services.AddSingleton<FirebaseService>();

// ➕ Ajoutez FirebaseAuthService dans le conteneur DI
builder.Services.AddSingleton<FirebaseAuthService>();

// Ajouter une politique CORS pour autoriser les requêtes de votre frontend Next.js
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Ajouter les services d'authentification et d'autorisation
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/investbuddy-dc991";
        options.Audience = "investbuddy-dc991";
    });
builder.Services.AddAuthorization();

// Ajouter les contrôleurs
builder.Services.AddControllers();

var app = builder.Build();


app.UseRouting();

// Activer CORS avec la politique définie
app.UseCors("AllowNextJs");

// Utiliser le middleware qui protège vos endpoints via FirebaseAuthService
app.UseMiddleware<FirebaseAuthMiddleware>();


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
