import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DropletIcon, BrainIcon } from './Icons';
import CircularProgress from './CircularProgress';

export default function HabitCards() {
  const [waterProgress, setWaterProgress] = useState(0.1);
  const [meditationProgress, setMeditationProgress] = useState(0.1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habits</Text>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <DropletIcon size={24} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Water</Text>
          <CircularProgress 
            progress={waterProgress} 
            onProgressChange={setWaterProgress}
          />
          <Text style={styles.progressText}>
            {Math.round(waterProgress * 10)} of 10
          </Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <BrainIcon size={24} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Meditation</Text>
          <CircularProgress 
            progress={meditationProgress} 
            onProgressChange={setMeditationProgress}
          />
          <Text style={styles.progressText}>
            {Math.round(meditationProgress * 10)} of 10
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  card: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  progressText: {
    color: '#999',
    marginTop: 10,
  },
});

