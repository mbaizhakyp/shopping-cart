// Function to update the quantity of an item in the cart.
const handleUpdateQuantity = (productId, newQuantity, setCartItems) => {
  setCartItems((currentItems) => {
    if (newQuantity <= 0) {
      return currentItems.filter((item) => item.id !== productId);
    }
    return currentItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
  });
};

export { handleUpdateQuantity };
