using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace investbuddy.Server.Controllers
{
    public class ForecastController : Controller
    {
        // GET: Forecast/Index?stock=AAPL&forecastSteps=10
        public async Task<IActionResult> Index(string stock, int forecastSteps = 1)
        {
            if (string.IsNullOrWhiteSpace(stock))
            {
                return Content("Stock symbol is required.");
            }

            try
            {
                // Build the command to run your Python script.
                // Adjust the python executable path and script path as necessary.
                var psi = new ProcessStartInfo
                {
                    FileName = "python", // Ensure this is in PATH, or provide full path to python.exe
                    Arguments = $"rollingarimaforecast.py {stock} {forecastSteps}",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                var process = Process.Start(psi);
                string output = await process.StandardOutput.ReadToEndAsync();
                string errors = await process.StandardError.ReadToEndAsync();
                process.WaitForExit();

                if (!string.IsNullOrWhiteSpace(errors))
                {
                    return Content("Error: " + errors);
                }

                // Deserialize the JSON output from the Python script.
                var forecastResult = JsonConvert.DeserializeObject<ForecastResult>(output);
                return View(forecastResult);
            }
            catch (Exception ex)
            {
                return Content("Exception: " + ex.Message);
            }
        }
    }

    public class ForecastResult
    {
        public string stock { get; set; }
        public double[] forecast { get; set; }
        public string error { get; set; }
    }
}
