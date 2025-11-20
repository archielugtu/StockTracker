using api.Data;
using api.Dto.Comment;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQueryObject commentQueryObject)
        {
            var comments = _context.Comments.Include(c => c.AppUser).AsQueryable(); //allows LINQ queries to be executed against a database without actually calling it yet

            if (!string.IsNullOrWhiteSpace(commentQueryObject.Symbol))
            {
                comments = comments.Where(c => c.Stock.Symbol == commentQueryObject.Symbol);
            }

            if (commentQueryObject.IsDescending)
            { 
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }

            return await comments.ToListAsync(); //actully executes the query against the database and retrieves the results as a list
        }

        public async Task<Comment?> GetByIdAsync(int id) => await _context.Comments.Include(c => c.AppUser).FirstOrDefaultAsync(c => c.Id == id);

        public async Task<Comment?> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> UpdateAsync(int id, Comment comment)
        {
            var existingComment = await _context.Comments.FindAsync(id);
            if (existingComment == null) return null;
            existingComment.Title = comment.Title;
            existingComment.Content = comment.Content;

            await _context.SaveChangesAsync();
            return existingComment;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentModel = await _context.Comments.FindAsync(id);
            if (commentModel == null) return null;
            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }
    }
}
