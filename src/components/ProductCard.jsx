import React from 'react';
import '../styles/ProductCard.css';  // ✅ Correct path to styles folder

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      {/* Product image */}
      <img src={product.image} alt={product.name} className="product-image" />

      {/* Product details */}
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>

      {/* Add to Cart button */}
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;