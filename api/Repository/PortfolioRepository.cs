using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDbContext _context;

        public PortfolioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios.Where(u => u.AppUserId == user.Id)
                .Select(portoflio => new Stock
                {
                    Id = portoflio.StockId,
                    Symbol = portoflio.Stock.Symbol,
                    CompanyName = portoflio.Stock.CompanyName,
                    Purchase = portoflio.Stock.Purchase,
                    LastDiv = portoflio.Stock.LastDiv,
                    Industry = portoflio.Stock.Industry,
                    MarketCap = portoflio.Stock.MarketCap
                }).ToListAsync();
        }
    }
}
