using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace songService.Controllers
{
    public class TranslationController : ControllerBase
    {
        private static readonly string subscriptionKey = "f31f5fafd4b44a0eb57279c56de7b4c7";
        private static readonly string location = "southeastasia";
        private static readonly string endpoint = "https://api.cognitive.microsofttranslator.com/";

        //POST: 
        //Params: api-version: 3.0, to
        //Headers: Ocp-Apim-Subscription-Key, Ocp-Apim-Subscription-Region: southeastasia, Content-Type: application/json
        //Body: Text
        static async Task Main(string textToTranslate, string languageCode)
        {
            // Input and output languages are defined as parameters.
            string route = "/translate?api-version=3.0&&to={languageCode}";
            object[] body = new object[] { new { Text = textToTranslate } };
            var requestBody = JsonConvert.SerializeObject(body);

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                // Build the request.
                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri(endpoint + route);
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                request.Headers.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
                request.Headers.Add("Ocp-Apim-Subscription-Region", location);

                // Send the request and get response.
                HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                // Read response as a string.
                string result = await response.Content.ReadAsStringAsync();
                Console.WriteLine(result);
            }
        }
    }
}
