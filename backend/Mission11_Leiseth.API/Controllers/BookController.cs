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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "title", string sortOrder = "asc")
        {
            var booksQuery = _bookContext.Books.AsQueryable();
            
            if (sortBy.ToLower() == "title")
            {
                booksQuery = sortOrder.ToLower() == "desc"
                    ? booksQuery.OrderByDescending(b => b.Title)
                    : booksQuery.OrderBy(b => b.Title);
            }
            
            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var responseObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(responseObject);
        }

    }
}