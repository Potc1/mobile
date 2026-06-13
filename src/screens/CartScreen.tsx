import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { items, removeItem, placeOrder, loading } = useCart();
  const [form, setForm] = useState({ name: '', address: '', phone: '' });

  const total = items.reduce((sum, i) => sum + i.price, 0);

  const handleOrder = async () => {
    if (!form.name || !form.address || !form.phone) {
      Alert.alert('Ошибка', 'Заполните все поля анкеты');
      return;
    }
    await placeOrder(form);
    Alert.alert('Заказ оформлен!', 'Скоро с вами свяжутся');
    setForm({ name: '', address: '', phone: '' });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.cartId.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name} – {item.price}₽</Text>
            <Button title="Удалить" onPress={() => removeItem(item.cartId)} />
          </View>
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Для заказа товара заполните анкету</Text>
            <TextInput style={styles.input} placeholder="Ваше имя" value={form.name} onChangeText={(t) => setForm({...form, name:t})} />
            <TextInput style={styles.input} placeholder="Адрес" value={form.address} onChangeText={(t) => setForm({...form, address:t})} />
            <TextInput style={styles.input} placeholder="Телефон" keyboardType="phone-pad" value={form.phone} onChangeText={(t) => setForm({...form, phone:t})} />
            <Text style={styles.total}>Итого: {total}₽</Text>
          </>
        }
      />
      <Button title="Подтвердить заказ" onPress={handleOrder} disabled={loading || items.length===0} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 6, borderRadius: 8 },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
});