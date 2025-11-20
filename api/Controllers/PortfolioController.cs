using api.Extensions;
using api.Interfaces;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        // Offered by AspNetCore.Identity to remove overhead of rewriting user authentication/authorization logic
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IFMPService _fmpService;

        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepo, IPortfolioRepository portfolioRepo, IFMPService fmpService)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            string username = User.GetUsername(); // User of type ClaimsPrincipal which is inherited from the ControllerBase. GetUserName is derived from ClaimsExtensions.cs
            AppUser? appUser = await _userManager.FindByNameAsync(username);
            List<Stock> userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            return Ok(userPortfolio);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            string username = User.GetUsername();
            AppUser? appUser = await _userManager.FindByNameAsync(username);
            Stock? stock = await _stockRepo.GetBySymbolAsync(symbol);

            //If stock does not exist in our database, then call FMP API to get the stock details and add it to database
            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);
                if (stock != null)
                {
                    await _stockRepo.CreateAsync(stock);
                }
            }

            if (stock == null) return NotFound($"Stock with the symbol '{symbol}' not found");

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            if (userPortfolio.Any(s => s.Symbol.ToLower() == symbol.ToLower())) return BadRequest($"Stock with the symbol '{symbol}' is already in your portfolio");

            var portfolioModel = new Portfolio
            {
                AppUserId = appUser.Id,
                StockId = stock.Id
            };

            await _portfolioRepo.CreateAsync(portfolioModel);

            if (portfolioModel == null) return StatusCode(500, "Could not create");

            return Created();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            string username = User.GetUsername();
            AppUser? appUser = await _userManager.FindByNameAsync(username);
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            var filteredStock = userPortfolio.Where(s => s.Symbol.ToLower() == symbol.ToLower());
            if (filteredStock.Count() == 1)
            {
                await _portfolioRepo.DeleteAsync(appUser, symbol);
            } else
            {
                return BadRequest($"Stock with the symbol '{symbol}' not found in your portfolio");
            }

            return Ok();
        }
    }
}
