// Calculate the total number of items in the cart.
const cartItemCount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};
export { cartItemCount };
