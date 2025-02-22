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
                
                // ✅ Vérifie si "alert" est bien présent
                if (!alertData.TryGetProperty("alert", out JsonElement alertElement))
                {
                    return BadRequest(new { message = "Données invalides : 'alert' manquant" });
                }

                // ✅ Désérialise correctement en `UserAlert`
                UserAlert alert = JsonSerializer.Deserialize<UserAlert>(alertElement.GetRawText(), new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (alert == null || string.IsNullOrEmpty(alert.UserId) || string.IsNullOrEmpty(alert.StockName) || string.IsNullOrEmpty(alert.Operator))
                {
                    return BadRequest(new { message = "Données invalides : champs obligatoires manquants" });
                }

                // ✅ Générer un ID automatique et le timestamp
                alert.Id = Guid.NewGuid().ToString();
                alert.CreatedAt = Timestamp.FromDateTime(DateTime.UtcNow);
                _logger.LogInformation(alert.StockName);

                // ✅ Ajoute l'alerte dans Firestore
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
