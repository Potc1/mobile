import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductScreen from '../screens/ProductScreen';
import SingleProductScreen from '../screens/SingleProductScreen'
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="О нас" component={AboutScreen} />
        <Tab.Screen name="Товары" component={ProductScreen} />
        <Tab.Screen name="Товар" component={SingleProductScreen} initialParams={{productId: '1'}}/>
        <Tab.Screen name="Корзина" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}