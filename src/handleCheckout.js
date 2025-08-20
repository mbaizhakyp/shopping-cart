// Function to empty the cart upon "checkout".
const handleCheckout = (setShowCheckoutMessage, setCartItems) => {
  setShowCheckoutMessage(true);
  setCartItems([]);
};

export { handleCheckout };
