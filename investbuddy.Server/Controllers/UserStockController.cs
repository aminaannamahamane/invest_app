using Microsoft.AspNetCore.Mvc;
using investbuddy.Server.Models;
using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace investbuddy.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserStockController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
       
        public UserStockController()
        {
            _firestoreDb = FirestoreDb.Create("investbuddy-dc991");
        }
       
        // POST api/UserStock
        [HttpPost]
        public async Task<IActionResult> CreateUserStock([FromBody] UserStock userStock)
        {
            // Récupérer l'ID de l'utilisateur authentifié (défini dans le middleware)
            var authUserId = HttpContext.Items["UserId"] as string;
            if (string.IsNullOrEmpty(authUserId))
                return Unauthorized(new { message = "Token invalide ou manquant." });

            if (userStock == null || string.IsNullOrEmpty(userStock.StockName))
            {
                return BadRequest("Le champ StockName est requis.");
            }
            
            // Forcer l'ID utilisateur à celui provenant du token pour éviter toute falsification
            userStock.UserId = authUserId;
           
            try
            {
                CollectionReference userStocksCollection = _firestoreDb.Collection("UserStocks");
                DocumentReference newUserStockRef = userStocksCollection.Document();
               
                await newUserStockRef.SetAsync(userStock);
               
                return Ok(new { message = "UserStock ajouté avec succès!", id = newUserStockRef.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de l'ajout du UserStock.", error = ex.Message });
            }
        }

        // GET api/UserStock
        [HttpGet]
        public async Task<IActionResult> GetUserStocks()
        {
            // Récupérer l'ID de l'utilisateur authentifié (défini dans le middleware)
            var userId = HttpContext.Items["UserId"] as string;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Token invalide ou manquant." });
           
            try
            {
                CollectionReference stocksCollection = _firestoreDb.Collection("UserStocks");
                Query query = stocksCollection.WhereEqualTo("UserId", userId);
                QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

                List<UserStock> stocks = new List<UserStock>();
                foreach (DocumentSnapshot doc in querySnapshot.Documents)
                {
                    if (doc.Exists)
                    {
                        var stock = doc.ConvertTo<UserStock>();
                        Console.WriteLine($"Récupéré: doc.Id={doc.Id}, UserId={stock.UserId}, StockName={stock.StockName}");
                        stocks.Add(stock);
                    }
                }
                return Ok(stocks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur lors de la récupération des stocks", error = ex.Message });
            }
        }
    }
}
