import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DailyProgress() {
  const days = Array(5).fill(14);

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <View key={index} style={styles.circle}>
          <Text style={styles.number}>{day}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

