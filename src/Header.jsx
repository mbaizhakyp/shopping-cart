// A shared header component for all pages.
import { ShoppingCart, ShoppingBag, Home } from "lucide-react";

const Header = ({ setCurrentPage, cartItemCount, cartItems }) => (
  <header className="header">
    <div className="container header-container">
      <h1 className="logo" onClick={() => setCurrentPage("home")}>
        E-Commerce Store
      </h1>
      <nav className="nav">
        <button className="nav-button" onClick={() => setCurrentPage("home")}>
          <Home size={24} />
          <span className="nav-text">Home</span>
        </button>
        <button className="nav-button" onClick={() => setCurrentPage("shop")}>
          <ShoppingBag size={24} />
          <span className="nav-text">Shop</span>
        </button>
        <button
          className="nav-button nav-cart"
          onClick={() => setCurrentPage("cart")}
        >
          <ShoppingCart size={24} />
          <span className="nav-text">Cart</span>
          {cartItemCount(cartItems) > 0 && (
            <span className="cart-count">{cartItemCount(cartItems)}</span>
          )}
        </button>
      </nav>
    </div>
  </header>
);

export default Header;
