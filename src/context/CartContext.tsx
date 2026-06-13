import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchCart, addToCart, removeFromCart, submitOrder } from '../services/database';

type CartItem = {
  id: string;
  name: string;
  price: number;
  cartId: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: any) => Promise<void>;
  removeItem: (cartId: number) => Promise<void>;
  placeOrder: (formData: any) => Promise<void>;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const cart = await fetchCart();
    setItems(cart);
    setLoading(false);
  };

  const addItem = async (product: any) => {
    const newCart = await addToCart(product);
    setItems(newCart);
  };

  const removeItem = async (cartId: number) => {
    const newCart = await removeFromCart(cartId);
    setItems(newCart);
  };

  const placeOrder = async (formData: any) => {
    await submitOrder({ ...formData, items });
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, placeOrder, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};