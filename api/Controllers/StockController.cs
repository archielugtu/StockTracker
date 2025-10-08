using api.Data;
using api.Dto.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController] //tells ASP.NET Core that this controller responds to web API requests not MVC views
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _stockRepo;

        public StockController(IStockRepository stockRepo)
        {
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockDto>>> GetAll()
        {
            var stocks = await _stockRepo.GetAllAsync();
            return Ok(stocks.Select(s => s.ToStockDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StockDto>> GetById([FromRoute] int id)
        {
            var stockModel = await _stockRepo.GetByIdAsync(id);
            if (stockModel == null) return NotFound($"Stock {id} does not exist.");
            return Ok(stockModel.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            Stock stockModel = stockDto.ToStockFromCreateDto();
            await _stockRepo.CreateAsync(stockModel);
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<StockDto>> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto stockDto)
        {
            var stockModel = await _stockRepo.UpdateAsync(id, stockDto);
            if (stockModel == null) return NotFound($"Stock {id} does not exist.");
            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var stockModel = await _stockRepo.DeleteAsync(id);
            if (stockModel == null) return NotFound($"Stock {id} does not exist.");
            return NoContent(); //204
        }
    }
}
