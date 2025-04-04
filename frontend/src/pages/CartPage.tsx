import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const totalAmount = cart.reduce((total, item: CartItem) => total + item.price * item.quantity, 0);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2 className="text-center my-4">Your Cart</h2>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 mx-auto">
                    {cart.length === 0 ? (
                        <p className="text-center">Your cart is empty.</p>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item: CartItem) => (
                                    <tr key={item.bookId}>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.bookId)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {cart.length > 0 && (
                <div className="row">
                    <div className="col-md-8 mx-auto text-center">
                        <h3 className="my-3">Total: ${totalAmount.toFixed(2)}</h3>
                        <button className="btn btn-success mx-2">Checkout</button>
                        <button className="btn btn-secondary mx-2" onClick={() => navigate('/book')}>Continue Browsing</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
