// Custom message box for checkout
const CheckoutMessage = ({ setShowCheckoutMessage, setCurrentPage }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3 className="modal-title">Order Confirmed!</h3>
      <p className="modal-body-text">
        Thank you for your order. Your cart has been emptied.
      </p>
      <button
        onClick={() => {
          setShowCheckoutMessage(false);
          setCurrentPage("shop");
        }}
        className="modal-button"
      >
        Continue Shopping
      </button>
    </div>
  </div>
);

export default CheckoutMessage;
