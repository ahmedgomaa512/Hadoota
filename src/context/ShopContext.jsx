import { createContext, useContext, useMemo, useState } from 'react';
import { products } from '../data/products';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([{ productId: 'plush-bear', qty: 1 }]);
  const [wishlist, setWishlist] = useState(['animal-storybook']);
  const [orders, setOrders] = useState([]);

  const addToCart = (productId, qty = 1) => {
    setCart((items) => {
      const existing = items.find((item) => item.productId === productId);
      if (existing) {
        return items.map((item) => (item.productId === productId ? { ...item, qty: item.qty + qty } : item));
      }
      return [...items, { productId, qty }];
    });
  };

  const updateQty = (productId, qty) => {
    setCart((items) =>
      items
        .map((item) => (item.productId === productId ? { ...item, qty: Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart((items) => items.filter((item) => item.productId !== productId));
  };

  const toggleWishlist = (productId) => {
    setWishlist((items) => (items.includes(productId) ? items.filter((id) => id !== productId) : [...items, productId]));
  };

  const clearCart = () => setCart([]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }))
        .filter((item) => item.product),
    [cart],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const deliveryFee = subtotal > 0 ? 45 : 0;
  const total = subtotal + deliveryFee;
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const value = {
    cart,
    cartItems,
    cartCount,
    subtotal,
    deliveryFee,
    total,
    wishlist,
    orders,
    addToCart,
    updateQty,
    removeFromCart,
    toggleWishlist,
    clearCart,
    setOrders,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used inside ShopProvider');
  }
  return context;
}
