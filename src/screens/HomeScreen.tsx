import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Footer from '../components/Footer';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Добро пожаловать в HomeSmart!</Text>
        <Text>Умные устройства для вашего дома</Text>
        <Button title="О компании" onPress={() => navigation.navigate('О нас')} />
        <Button title="Смотреть товары" onPress={() => navigation.navigate('Товары')} />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});