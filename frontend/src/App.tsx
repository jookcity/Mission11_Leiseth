import './App.css'
import AddToCartPage from './pages/AddToCartPage'
import BooksPage from './pages/BookPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import "bootstrap/dist/css/bootstrap.min.css";
import AdminBooksPage from './pages/AdminBooksPage'

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path='/book' element={<BooksPage />} />
          <Route 
            path="/addtocart/:title/:bookId/:price" 
            element={<AddToCartPage />} 
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/adminbooks' element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </>
  )
}

export default App
