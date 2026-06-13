import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Footer = () => {
  const handleSupport = () => {
    Alert.alert('Поддержка', 'Напишите нам на support@homesmart.com');
  };

  const handleAppeal = () => {
    Alert.alert('Обращение', 'Форма обращения будет здесь');
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.logo}>HomeSmart</Text>
      <TouchableOpacity onPress={handleSupport}>
        <Text style={styles.link}>Написать в поддержку</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAppeal}>
        <Text style={styles.link}>Ваше обращение</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  logo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  link: { fontSize: 14, color: '#0066cc', marginVertical: 4 },
});

export default Footer;