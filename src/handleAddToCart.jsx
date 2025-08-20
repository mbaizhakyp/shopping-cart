// Function to add a new item or update the quantity of an existing one.
const handleAddToCart = (product, quantity, setCartItems) => {
  setCartItems((currentItems) => {
    const itemExists = currentItems.find((item) => item.id === product.id);
    if (itemExists) {
      return currentItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      return [...currentItems, { ...product, quantity }];
    }
  });
};

export { handleAddToCart };
