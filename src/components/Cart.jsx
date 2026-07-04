function Cart({ cartItems, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-box">
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.name} x {item.quantity}</span>
            <button className="remove-btn" onClick={() => onRemove(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
}

export default Cart;