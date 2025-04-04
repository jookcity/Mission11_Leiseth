import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import CartSummary from "../components/CartSummary";

function BooksPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    return (
        <div className="container mt-4">
            <CartSummary />
            <WelcomeBand />

            <div className="row mt-3">
                <div className="col-lg-3 col-md-4 mb-3">
                    <div className="card p-3 shadow-sm">
                        <h5 className="text-center">Filter by Category</h5>
                        <CategoryFilter 
                            selectedCategories={selectedCategories} 
                            setSelectedCategories={setSelectedCategories}
                        />
                    </div>
                </div>
                <div className="col-lg-9 col-md-8">
                    <BookList selectedCategories={selectedCategories}/>
                </div>
            </div>
        </div>
    );
}

export default BooksPage;