using Google.Cloud.Firestore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using investbuddy.Server.Models;
using investbuddy.Server.Services;
using Microsoft.Extensions.Logging;

namespace investbuddy.Server.Controllers
{
    [Route("api/alerts")]
    [ApiController]
    public class UserAlertController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;
        private readonly ILogger<UserAlertController> _logger; // 🔥 Ajout du logger

        public UserAlertController(FirebaseService firebaseService, ILogger<UserAlertController> logger)
        {
            _firebaseService = firebaseService;
            _logger = logger;
            _logger.LogInformation("🔥 UserAlertController chargé !");
        }

        [HttpPost]
        public async Task<IActionResult> CreateAlert([FromBody] UserAlert alert)
        {
            _logger.LogInformation("🚀 Requête POST reçue pour une alerte !");
            if (alert == null || string.IsNullOrEmpty(alert.UserId) || string.IsNullOrEmpty(alert.Id))
            {
                return BadRequest(new { message = "Invalid alert data" });
            }

            await _firebaseService.AddUserAlertAsync(alert);
            return Ok(new { message = "Alert created successfully!" });
        }
    }
}