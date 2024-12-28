import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Text,
} from 'react-native';

const CustomSlider = ({ min = 0, max = 100, step = 1, onValueChange, value }) => {
  const [sliderValue, setSliderValue] = useState(value || min);
  const sliderWidth = useRef(0);
  const pan = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSliderValue(value);
    // Update the pan position based on the new sliderValue
    const range = max - min;
    const newX = ((sliderValue - min) / range) * sliderWidth.current;
    pan.setValue(newX);
  }, [value, sliderValue]);

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
        // Set initial pan position based on the current sliderValue
        const range = max - min;
        const initialX = ((sliderValue - min) / range) * sliderWidth.current;
        pan.setValue(initialX);
      }}
    >
      {/* Track background */}
      <View style={[[styles.track,{
            backgroundColor:max<3? "#88D7F6": "#ddd"
          }]]} />
      {/* Progress track */}
      <Animated.View
        style={[
          styles.progress,
          {
            width: pan.interpolate({
              inputRange: [0, sliderWidth.current],
              outputRange: [0, sliderWidth.current],
              extrapolate: 'clamp',
            }),
          },
          {
            backgroundColor:max<3? "#88D7F6": "#9B43FF"
          }
        ]}
      />
      {/* Thumb */}
      <Animated.View
        style={[
          styles.thumb,
          { transform: [{ translateX: pan }] },
        ]}
        {...panResponder.panHandlers}
      />
      {/* Value Display */}
      <Text style={styles.valueText}>{sliderValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width:150
  },
  track: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 8,
    position: 'absolute',
    left: 10,
    right: 10,
  },
  progress: {
    height: 8,
    backgroundColor: '#9B43FF',
    borderRadius: 8,
    position: 'absolute',
    left: 10,
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: 8,
    zIndex:5
  },
  valueText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#333',
  },
});

export default CustomSlider;
