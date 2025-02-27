using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using investbuddy.Server.Models;
using investbuddy.Server.Services;
using Google.Cloud.Firestore;

namespace investbuddy.Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;

        public UserController(FirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserModel user)
        {
            await _firebaseService.AddUserAsync(user);
            return Ok(new { message = "User created successfully!" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            // On s'assure que l'ID dans l'URL correspond à celui du token
            var authUserId = HttpContext.Items["UserId"] as string;
            if (string.IsNullOrEmpty(authUserId) || authUserId != id)
            {
                return Unauthorized(new { message = "Accès non autorisé." });
            }

            var user = await _firebaseService.GetUserAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPut("{id}/lastLogin")]
        public async Task<IActionResult> UpdateLastLogin(string id)
        {
            var authUserId = HttpContext.Items["UserId"] as string;
            if (string.IsNullOrEmpty(authUserId) || authUserId != id)
            {
                return Unauthorized(new { message = "Accès non autorisé." });
            }
            await _firebaseService.UpdateLastLoginAsync(id);
            return Ok(new { message = "Last login updated!" });
        }

        [HttpPut("{id}/theme")]
        public async Task<IActionResult> ChangeTheme(string id, [FromBody] ThemeRequest request)
        {
            var authUserId = HttpContext.Items["UserId"] as string;
            if (string.IsNullOrEmpty(authUserId) || authUserId != id)
            {
                return Unauthorized(new { message = "Accès non autorisé." });
            }
            if (request == null || string.IsNullOrEmpty(request.Theme))
            {
                return BadRequest(new { message = "Le champ 'theme' est requis." });
            }
            await _firebaseService.UpdateUserThemeAsync(id, request.Theme);
            return Ok(new { message = "Thème mis à jour avec succès", theme = request.Theme });
        }
    }

    public class ThemeRequest
    {
        public string Theme { get; set; }
    }
}
