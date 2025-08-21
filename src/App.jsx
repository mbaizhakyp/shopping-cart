import { useState, useEffect } from "react";
import { ShoppingCart, ShoppingBag, Home, X, RefreshCw } from "lucide-react";
import "./App.css"; // Importing the main CSS file for styling
import { handleAddToCart } from "./handleAddToCart";
import { cartItemCount } from "./cartItemCount";
import { handleUpdateQuantity } from "./handleUpdateQuantity";
import { handleRemoveFromCart } from "./handleRemoveFromCart";
import { handleCheckout } from "./handleCheckout";
import Header from "./Header";
import CheckoutMessage from "./CheckoutMessage";

// Main App component that manages all state and renders pages.
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  // Fetch product data from the FakeStore API on component mount.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.map((product) => ({
          ...product,
          image: `https://placehold.co/400x300/F0F4F8/1A202C?text=${
            product.title.split(" ")[0]
          }`,
        }));
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Component for the home page.
  const HomePage = () => (
    <main className="container main-content home-page">
      <h2 className="page-title">Welcome to Our Store!</h2>
      <p className="page-subtitle">
        Discover a curated collection of high-quality electronics and
        accessories. From the latest gadgets to essential gear, we have
        everything you need.
      </p>
      <button onClick={() => setCurrentPage("shop")} className="primary-button">
        Start Shopping Now
      </button>
    </main>
  );

  // Component for displaying the list of products.
  const ShopPage = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <RefreshCw className="loading-spinner" /> Loading products...
        </div>
      );
    }

    if (error) {
      return <div className="error-state">{error}</div>;
    }

    return (
      <main className="container main-content shop-page">
        <h2 className="page-title">Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
    );
  };

  // Individual product card component.
  const ProductCard = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value, 10);
      setQuantity(value > 0 ? value : 1);
    };

    const handleIncrement = () => setQuantity((q) => q + 1);
    const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
      <div className="product-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-card-content">
          <div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
          </div>
          <div className="product-actions">
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="quantity-control">
              <button onClick={handleDecrement} className="quantity-button">
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
                min="1"
              />
              <button onClick={handleIncrement} className="quantity-button">
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart(product, quantity, setCartItems)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Component for displaying the cart contents.
  const CartPage = () => (
    <main className="container main-content cart-page">
      <h2 className="page-title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty-state">
          <p className="cart-empty-text">Your cart is empty.</p>
          <button
            onClick={() => setCurrentPage("shop")}
            className="primary-button"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list-container">
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-details">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <p className="cart-item-title">{item.title}</p>
                      <p className="cart-item-price">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.quantity - 1,
                          setCartItems
                        )
                      }
                      className="cart-quantity-button"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(
                          item.id,
                          parseInt(e.target.value),
                          setCartItems
                        )
                      }
                      className="cart-quantity-input"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.quantity + 1,
                          setCartItems
                        )
                      }
                      className="cart-quantity-button"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        handleRemoveFromCart(item.id, setCartItems)
                      }
                      className="cart-remove-button"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-summary-container">
            <p className="cart-total">Total: ${totalCartPrice.toFixed(2)}</p>
            <button
              onClick={() =>
                handleCheckout(setShowCheckoutMessage, setCartItems)
              }
              className="checkout-button"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );

  return (
    <div className="app-container">
      <Header
        setCurrentPage={setCurrentPage}
        cartItemCount={cartItemCount}
        cartItems={cartItems}
      />
      {currentPage === "home" && <HomePage />}
      {currentPage === "shop" && <ShopPage />}
      {currentPage === "cart" && <CartPage />}
      {showCheckoutMessage && (
        <CheckoutMessage
          setShowCheckoutMessage={setShowCheckoutMessage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
