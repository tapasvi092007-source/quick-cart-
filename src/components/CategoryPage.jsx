import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from './ProductList';

function CategoryPage({ products, onAddToCart }) {
  // Get category from URL params
  const { category } = useParams();

  // Filter products by category
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="category-page">
      {/* Show category title */}
      <h2>{category} Products</h2>

      {/* Render filtered products or empty state */}
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} addToCart={onAddToCart} />
      ) : (
        <p className="empty-state">No products found in {category}</p>
      )}
    </div>
  );
}

export default CategoryPage;