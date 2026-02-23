import React from 'react';
import ProductList from './ProductList';

function HomePage({ products, onAddToCart, searchTerm }) {
  // Filter products based on searchTerm
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {/* Show filtered count if searching */}
      {searchTerm && (
        <p className="search-info">
          Found {filteredProducts.length} product(s) matching "{searchTerm}"
        </p>
      )}

      {/* Render ProductList with filtered products */}
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} addToCart={onAddToCart} />
      ) : (
        <p className="empty-state">No products found</p>
      )}
    </div>
  );
}

export default HomePage;