import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView, ListRenderproduct } from 'react-native';
import Footer from '../components/Footer';
import { fetchProductById } from '../services/database';
import { useCart } from '../context/CartContext';

export default function ProductScreen({ route }: any) {
  const { productId } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [specs_product, setSpecs] = useState<any>(null);

  useEffect(() => {
    fetchProductById(productId).then(setProduct).finally(() => setLoading(false));
    if (product) setSpecs(JSON.parse(product.specs));
  }, [productId]);

  if (loading) return <ActivityIndicator size="large" />;
  if (!product) return <Text>Товар не найден</Text>;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product?.price}₽</Text>
        <Button title="Купить" onPress={() => addItem(product)} />
        <Text style={styles.desc}>{product?.description}</Text>
        <Text style={styles.specTitle}>Характеристики:</Text>
        <Text>Камера: {specs_product?.camera}</Text>
        <Text>Память: {specs_product?.memory}</Text>
        <Text>Время работы: {specs_product?.battery}</Text>
      </ScrollView>
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