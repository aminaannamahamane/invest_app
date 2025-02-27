using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using investbuddy.Server.Models;
using investbuddy.Server.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace investbuddy.Server.Controllers
{
    [Route("api/alerts")]
    [ApiController]
    public class UserAlertController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;
        private readonly ILogger<UserAlertController> _logger;

        public UserAlertController(FirebaseService firebaseService, ILogger<UserAlertController> logger)
        {
            _firebaseService = firebaseService;
            _logger = logger;
            _logger.LogInformation("🔥 UserAlertController chargé !");
        }

        [HttpPost]
        public async Task<IActionResult> CreateAlert([FromBody] JsonElement alertData)
        {
            try
            {
                _logger.LogInformation("🚀 Requête POST reçue pour une alerte !");
                
                // Vérifier que le champ "alert" est présent dans le JSON
                if (!alertData.TryGetProperty("alert", out JsonElement alertElement))
                {
                    return BadRequest(new { message = "Données invalides : 'alert' manquant" });
                }

                // Désérialiser en UserAlert
                UserAlert alert = JsonSerializer.Deserialize<UserAlert>(alertElement.GetRawText(), new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (alert == null || string.IsNullOrEmpty(alert.StockName) || string.IsNullOrEmpty(alert.Operator))
                {
                    return BadRequest(new { message = "Données invalides : champs obligatoires manquants" });
                }

                // Forcer l'ID utilisateur à être celui du token validé par le middleware
                var authUserId = HttpContext.Items["UserId"] as string;
                if (string.IsNullOrEmpty(authUserId))
                {
                    return Unauthorized(new { message = "Token invalide ou manquant." });
                }
                alert.UserId = authUserId;

                // Générer un ID et le timestamp côté serveur
                alert.Id = Guid.NewGuid().ToString();
                alert.CreatedAt = Timestamp.FromDateTime(DateTime.UtcNow);

                _logger.LogInformation($"StockName: {alert.StockName}");

                // Ajouter l'alerte dans Firestore
                await _firebaseService.AddUserAlertAsync(alert);

                return Ok(new { message = "Alerte créée avec succès !" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"❌ Erreur lors de la création de l'alerte: {ex.Message}");
                return StatusCode(500, new { message = "Erreur interne du serveur" });
            }
        }
    }
}
