import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CalendarIcon } from './Icons';

export default function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good morning✨</Text>
        <Text style={styles.date}>Wed, 18 Dec 2024</Text>
      </View>
      <CalendarIcon size={24} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 16,
    color: '#999',
    marginTop: 4,
  },
});

