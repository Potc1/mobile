import { initDatabase, getAllProducts, getProductById, getCartItems, addToCartDb, removeFromCartDb, clearCart, Product } from '../databases/sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';


let dbInitialized = false;
export const ensureDbInit = async () => {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
};

const aboutKey = '@about_text';
export const fetchAboutText = async (): Promise<string> => {
  let text = await AsyncStorage.getItem(aboutKey);
  if (!text) {
    text = 'Компания HomeSmart является передовым продавцом на рынке устройств умного дома, нам доверяют тысячи домовладельцев.';
    await AsyncStorage.setItem(aboutKey, text);
  }
  return text;
};

// Получить товар по id 
export const fetchProductById = async (id: string): Promise<Product> => {
  await ensureDbInit();
  return getProductById(parseInt(id));
};

// Получить все товары 
export const fetchAllProducts = async (): Promise<Product[]> => {
  await ensureDbInit();
  return getAllProducts();
};

// Корзина
export const fetchCart = async (): Promise<any[]> => {
  await ensureDbInit();
  return getCartItems();
};


export const addToCart = async (product: any): Promise<any[]> => {
  await ensureDbInit();
  return addToCartDb(product.id);
};


export const removeFromCart = async (cartId: number): Promise<any[]> => {
  await ensureDbInit();
  return removeFromCartDb(cartId);
};


export const submitOrder = async (formData: any): Promise<{ success: boolean }> => {
  await ensureDbInit();
  await clearCart();
  return { success: true };
};