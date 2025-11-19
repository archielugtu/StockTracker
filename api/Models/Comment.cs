using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Comment")]
    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content{ get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? StockId { get; set; }
        public Stock? Stock { get; set; } //Navigation property allows us to navigate into the stock model from the comment model 

        // One-to-one relationship with app user
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
