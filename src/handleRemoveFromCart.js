// Function to remove an item completely from the cart.
const handleRemoveFromCart = (productId, setCartItems) => {
  setCartItems((currentItems) =>
    currentItems.filter((item) => item.id !== productId)
  );
};

export { handleRemoveFromCart };
