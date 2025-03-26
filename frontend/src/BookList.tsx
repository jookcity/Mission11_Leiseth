import { useEffect, useState } from "react";
import { Book } from './types/Book';

function BookList() {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize]  = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

    fetchBooks();
}, [pageSize, pageNum, sortOrder]);

    return (
        <>
            <h1>Books</h1>
            <br />
            {books.map((b) =>
            <div id="bookCard" className="card" key={b.bookId}>
                <h3 className="card-title">{b.title}</h3>
                <div className="card-body">
                <ul className="list-unstyled">
                    <li>Author: {b.author}</li>
                    <li>Publisher: {b.publisher}</li>
                    <li>ISBN: {b.isbn}</li>
                    <li>Classification: {b.classification}</li>
                    <li>Category: {b.category}</li>
                    <li>Number of Pages: {b.pageCount}</li>
                    <li>Price: {b.price}</li>
                </ul>
                </div>
            </div>
        
        )}

        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

        {
            [...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i +1)} disabled={pageNum === (i + 1)}>
                    {i + 1}
                </button>
            ))}

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

        <br />
        <button className="btn btn-primary mb-3"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            Sort by Title {sortOrder === "asc" ? "▲" : "▼"}
        </button>

        <br />
        <label>
            Results per page: 
            <select 
            value={pageSize} 
            onChange={(p) => {
                setPageSize(Number(p.target.value));
                setPageNum(1);
            }}
        >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
        </label>
        </>
    );
}
export default BookList;