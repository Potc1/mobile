import React, {useEffect} from 'react';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';
import { ensureDbInit } from './src/services/database';

export default function App() {
  useEffect(() => {
    ensureDbInit().catch(err => console.error('DB init failed', err));
  }, []);
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}