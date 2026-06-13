import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView, ListRenderproduct } from 'react-native';
import Footer from '../components/Footer';
import { fetchAllProducts, fetchProductById } from '../services/database';
import { useCart } from '../context/CartContext';

export default function ProductScreen( { navigation }: any) {
  const { productId } = '1';
  const [product, setProduct] = useState<Array>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetchAllProducts().then(setProduct).finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <ActivityIndicator size="large" />;
  if (!product) return <Text>Товар не найден</Text>;

  return (
    <View style={styles.container}>
      {product?.map((item, key) => (
        
      <ScrollView style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item?.price}₽</Text>
        <Button title="Подробнее" onPress={() => navigation.navigate('Товар', { productId: item.id })}/>
        <Button title="Купить" onPress={() => addItem(item)} />
        
      </ScrollView>

      ))}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 20, color: 'green', marginVertical: 8 },
  desc: { marginVertical: 12 },
  specTitle: { fontWeight: 'bold', marginTop: 12 },
});