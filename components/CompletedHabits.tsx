import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CompletedHabits() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed</Text>
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, styles.meditationBadge]}>
          <Text style={styles.badgeText}>Meditation</Text>
        </View>
        <View style={[styles.badge, styles.waterBadge]}>
          <Text style={styles.badgeText}>Water 6 of 7</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  meditationBadge: {
    backgroundColor: '#8B5CF6',
  },
  waterBadge: {
    backgroundColor: '#EC4899',
  },
  badgeText: {
    color: '#fff',
    fontSize: 16,
  },
});

