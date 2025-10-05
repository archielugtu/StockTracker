﻿namespace api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content{ get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? StockId { get; set; }
        //Navigation property allows us to navigate into the stock model from the comment model 
        public Stock? Stock { get; set; }
    }
}
