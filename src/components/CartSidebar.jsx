import React from 'react';
import '../styles/CartSidebar.css';

function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {
  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      {/* Cart Items */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              {/* Item image */}
              <img src={item.image} alt={item.name} />

              {/* Item details */}
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>

              {/* Quantity controls */}
              <div className="quantity-controls">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              {/* Remove button */}
              <button onClick={() => onRemoveItem(item.id)} className="remove-btn">🗑️</button>
            </div>
          ))
        )}
      </div>

      {/* Footer with total */}
      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;