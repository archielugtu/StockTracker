using api.Dto.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using System.Text.Json;

namespace api.Services
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                string? apikey = _config["FMPKey"];
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={apikey}");
                
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync(); //serialize HTTP content to a string as an async operation
                    var tasks = JsonSerializer.Deserialize<FMPStock[]>(content);
                    var stock = tasks.FirstOrDefault();
                    if (stock != null)
                    {
                        return stock.ToStockFromFMP();
                    }
                }
                return null;
            } catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
