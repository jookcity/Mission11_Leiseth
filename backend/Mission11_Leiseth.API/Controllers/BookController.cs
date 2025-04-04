using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Leiseth.API.Data;

namespace Mission11_Leiseth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "title", string sortOrder = "asc", [FromQuery] List<string>? bookCategories = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (sortBy.ToLower() == "title")
            {
                query = sortOrder.ToLower() == "desc"
                ? query.OrderByDescending(b => b.Title)
                    : query.OrderBy(b => b.Title);
            }
            
            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }
            
            var totalNumBooks = query.Count();
            
            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var responseObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(responseObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }
    }
}