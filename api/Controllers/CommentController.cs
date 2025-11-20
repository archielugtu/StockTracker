using api.Dto.Comment;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;

        public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo, UserManager<AppUser> userManager, IFMPService fmpService)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
            _userManager = userManager;
            _fmpService = fmpService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetAll([FromQuery] CommentQueryObject commentQueryObject)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var comments = await _commentRepo.GetAllAsync(commentQueryObject);
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

        [HttpPost("{symbol:alpha}")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> Create([FromRoute] string symbol, [FromBody] CreateCommentRequestDto commentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stock = await _stockRepo.GetBySymbolAsync(symbol);

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

            var commentModel = commentDto.ToCommentFromCreateDto(stock.Id);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            commentModel.AppUserId = appUser.Id;
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
