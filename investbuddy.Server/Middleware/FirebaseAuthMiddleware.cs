using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using investbuddy.Server.Services;
using Microsoft.AspNetCore.Http.Extensions; // Pour HttpMethods

namespace investbuddy.Server.Middleware
{
    public class FirebaseAuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly FirebaseAuthService _authService;

        public FirebaseAuthMiddleware(RequestDelegate next, FirebaseAuthService authService)
        {
            _next = next;
            _authService = authService;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // 1️⃣ Laisser passer les requêtes OPTIONS (préflight CORS)
            if (HttpMethods.IsOptions(context.Request.Method))
            {
                await _next(context);
                return;
            }

            // 2️⃣ Vérifier l'en-tête Authorization pour les autres requêtes
            var authHeader = context.Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized: No Token Provided");
                return;
            }

            // 3️⃣ Extraire et vérifier le token
            var token = authHeader.Substring(7);
            var decodedToken = await _authService.VerifyToken(token);
            if (decodedToken == null)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized: Invalid Token");
                return;
            }

            // 4️⃣ Stocker l'ID utilisateur dans le HttpContext pour les contrôleurs
            context.Items["UserId"] = decodedToken.Uid;

            // 5️⃣ Continuer la pipeline
            await _next(context);
        }
    }
}
