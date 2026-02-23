import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { products } from './data/product';
import './styles/App.css';
import CartSidebar from './components/CartSidebar';


function App() {
  // State for cart items
  const [cart, setCart] = useState([]);

  // State for cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className="app">
      <Header
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={toggleCart}
      />
      <main className="main-content">
        <ProductList products={products} addToCart={addToCart} />
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;