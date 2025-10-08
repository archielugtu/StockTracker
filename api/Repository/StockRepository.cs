using api.Data;
using api.Dto.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDbContext _context;
        public StockRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Stock>> GetAllAsync() => await _context.Stocks.Include(s => s.Comments).ToListAsync();

        public async Task<Stock?> GetByIdAsync(int id) => await _context.Stocks.Include(s => s.Comments).FirstOrDefaultAsync(x => x.Id == id); //.FindAsync() doesn't work alongside queries

        public async Task<Stock?> CreateAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto)
        {
            var stockModel = await _context.Stocks.FindAsync(id);
            if (stockModel == null) return null;
            stockDto.UpdateStockModel(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stockModel = await _context.Stocks.FindAsync(id);
            if (stockModel == null) return null;
            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<bool> StockExistAsync(int id) => await _context.Stocks.AnyAsync(s => s.Id == id);
    }
}
