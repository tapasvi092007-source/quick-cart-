import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-footer">
        <span>${product.price}</span>
        <span>{product.category}</span>
      </div>
    </div>
  );
}

export default ProductCard;