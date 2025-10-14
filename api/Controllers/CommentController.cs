using api.Dto.Comment;
using api.Interfaces;
using api.Mappers;
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
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var comments = await _commentRepo.GetAllAsync();
            var commentsDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CommentDto>> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var commentModel = await _commentRepo.GetByIdAsync(id);
            if (commentModel == null) return NotFound($"Comment {id} does not exist.");
            return Ok(commentModel.ToCommentDto());
        }

        [HttpPost("{stockId:int}")]
        public async Task<ActionResult<CommentDto>> Create([FromRoute] int stockId, [FromBody] CreateCommentRequestDto commentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!await _stockRepo.StockExistAsync(stockId)) return BadRequest($"Stock {stockId} does not exist.");
            var commentModel = commentDto.ToCommentFromCreateDto(stockId);
            await _commentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id },  commentDto);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<CommentDto>> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto commentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var commentModel = await _commentRepo.UpdateAsync(id, commentDto.ToCommentFromUpdateDto());
            if (commentModel == null) return NotFound($"Comment {id} does not exist.");
            return Ok(commentModel.ToCommentDto());
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var commentModel = await _commentRepo.DeleteAsync(id);
            if (commentModel == null) return NotFound($"Comment {id} does not exist.");
            return NoContent();
        }
    }
}
