import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

function AddToCartPage() {
    const navigate = useNavigate();
    const { bookId, title, price } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        const priceNum = parseFloat(price || "0");

        const newItem: CartItem = {
            bookId: Number(bookId),
            title: title || "No title found",
            quantity,
            price: isNaN(priceNum) ? 0 : priceNum,
        };
        addToCart(newItem);
        navigate("/cart");
    };

    return (
        <div className="container">
            <WelcomeBand />
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card p-4 shadow">
                        <h2 className="text-center">Add "{title}" to Cart</h2>

                        <div className="mb-3">
                            <label className="form-label">Quantity:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter quantity"
                                value={quantity}
                                min="1"
                                onChange={(x) => setQuantity(Math.max(1, Number(x.target.value)))}
                            />
                        </div>

                        <div className="text-center">
                            <button className="btn btn-success w-100 mb-2" onClick={handleAddToCart}>
                                Confirm Add to Cart
                            </button>
                            <button className="btn btn-secondary w-100" onClick={() => navigate(-1)}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddToCartPage;
