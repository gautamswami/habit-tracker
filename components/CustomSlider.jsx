import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Text,
} from 'react-native';

const CustomSlider = ({ min = 0, max = 100, step = 1, onValueChange }) => {
  const [sliderValue, setSliderValue] = useState(min);
  const sliderWidth = useRef(0);
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      let newX = Math.min(
        Math.max(0, gestureState.dx + pan._value),
        sliderWidth.current
      );
      pan.setValue(newX);

      // Calculate value based on slider position, considering step
      const range = max - min;
      const rawValue = (newX / sliderWidth.current) * range + min;
      const steppedValue = Math.round(rawValue / step) * step; // Apply step

      // Ensure value is within bounds
      const clampedValue = Math.max(min, Math.min(steppedValue, max));
      setSliderValue(clampedValue);

      if (onValueChange) onValueChange(clampedValue);
    },
    onPanResponderRelease: () => {},
  });

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        sliderWidth.current = e.nativeEvent.layout.width - 20; // Adjust for padding
      }}
    >
      <View style={styles.track} />
      <Animated.View
        style={[
          styles.thumb,
          { transform: [{ translateX: pan }] },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: 150,
  },
  track: {
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 2,
    position: 'absolute',
    left: 10,
    right: 10,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    position: 'absolute',
    top: 9,
  },
  valueText: {
    marginTop: 15,
    textAlign: 'center',
    color: 'white',
    
  },
});

export default CustomSlider;
