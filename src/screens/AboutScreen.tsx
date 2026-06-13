import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Footer from '../components/Footer';
import { fetchAboutText } from '../services/database';

export default function AboutScreen() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutText().then((data) => {
      setText(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>О нас</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  text: { fontSize: 16, lineHeight: 24 },
});