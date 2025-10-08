using api.Data;
using api.Dto.Comment;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;

        public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetAll()
        {
            var comments = await _commentRepo.GetAllAsync();
            var commentsDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetById([FromRoute] int id)
        {
            var commentModel = await _commentRepo.GetByIdAsync(id);
            if (commentModel == null) return NotFound();
            return Ok(commentModel.ToCommentDto());
        }

        [HttpPost("{stockId}")]
        public async Task<ActionResult<CommentDto>> Create([FromRoute] int stockId, [FromBody] CreateCommentRequestDto commentDto)
        {
            if (!await _stockRepo.StockExistAsync(stockId)) return BadRequest($"Stock {stockId} does not exist.");
            var commentModel = commentDto.ToCommentFromCreateDto(stockId);
            await _commentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id },  commentDto);
        }
    }
}
