import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         {/* Родительский маршрут с Layout */}
         <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />               // главная
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
         </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;