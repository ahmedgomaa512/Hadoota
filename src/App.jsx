import { Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/*" element={<Checkout />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </>
  );
}
