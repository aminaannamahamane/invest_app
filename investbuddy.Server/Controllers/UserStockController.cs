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
            // Remplacez "investbuddy-dc991" par l'ID de votre projet Firebase si nécessaire.
            _firestoreDb = FirestoreDb.Create("investbuddy-dc991");
        }
       
        // POST api/UserStock
        [HttpPost]
        public async Task<IActionResult> CreateUserStock([FromBody] UserStock userStock)
        {
            if (userStock == null || string.IsNullOrEmpty(userStock.UserId) || string.IsNullOrEmpty(userStock.StockName))
            {
                return BadRequest("Les champs UserId et StockName sont requis.");
            }
           
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

        // GET api/UserStock?userId=xxx
        [HttpGet]
        public async Task<IActionResult> GetUserStocks([FromQuery] string userId)
        {
            if (string.IsNullOrEmpty(userId))
                return BadRequest("Le paramètre userId est requis.");
           
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
