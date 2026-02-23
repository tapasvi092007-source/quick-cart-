import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import CartSidebar from './components/CartSidebar';
import { products } from './data/product';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/App.css';

function App() {
  // Persistent cart state using custom hook
  const [cart, setCart] = useLocalStorage('cart', []);
  const [isCartOpen, setIsCartOpen] = useLocalStorage('isCartOpen', false);
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
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

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.id !== id);
      }
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Toggle cart sidebar
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Get total items
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          cartItemCount={getTotalItems()}
          onCartClick={toggleCart}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  onAddToCart={addToCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/category/:category"
              element={
                <CategoryPage
                  products={products}
                  onAddToCart={addToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                />
              }
            />
          </Routes>
        </main>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={toggleCart}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;