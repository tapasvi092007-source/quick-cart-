import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';

function CartPage({ cart, onUpdateQuantity, onRemoveItem }) {
  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          {/* Empty state */}
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-page-content">
          {/* Map through cart items */}
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <div className="cart-item-actions">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(item.id, parseInt(e.target.value, 10))
                    }
                  />
                  <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          {/* Show total */}
          <div className="cart-total">
            <h2>Total: ${calculateTotal().toFixed(2)}</h2>
          </div>

          {/* Continue Shopping and Checkout buttons */}
          <div className="cart-actions">
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;