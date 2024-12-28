import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Circle, LinearGradient, Stop, Defs } from "react-native-svg";
import Slider from "@react-native-community/slider";
import CustomSlider from "./CustomSlider";

export default function CircularProgress({
  size = 150,
  strokeWidth = 8,
  target,
  onProgressChange,
  current
}) {
  const [currentStep, setCurrentStep] = useState(current||0); // Current step (out of target)
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [offset, setOffset] = useState(0);
  
  useEffect(()=>{
     const progress = currentStep / target;
      setOffset(circumference - progress * circumference);
  },[currentStep])

  const handleSliderChange = (value) => {
    const newStep = Math.round(value);
    setCurrentStep(newStep);
    onProgressChange && onProgressChange(newStep);
  };

  useEffect(() => {
    // Update the slider value when currentStep changes
    setCurrentStep(current || 0);
  }, [current]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="#9B43FF" />
            <Stop offset="1" stopColor="#88D7F6" />
          </LinearGradient>
        </Defs>
        {/* Background Circle */}
        <Circle
          stroke="#333"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <Circle
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.centerText}>
        <Text style={styles.progressText}>
          {currentStep}/{target}
        </Text>
      </View>
      {/* <Slider
        style={styles.slider} 
        minimumValue={0}
        maximumValue={target}
        step={1}
        value={currentStep}
        onSlidingComplete={handleSliderChange}
        minimumTrackTintColor="#7C55FE"
        maximumTrackTintColor="#7C55FE"
        thumbTintColor="#7C55FE"
        tapToSeek={true}
        trackHeight={10}
      /> */}
      <CustomSlider 
        onValueChange={handleSliderChange} 
        min={0} 
        max={target} 
        step={1} 
        value={currentStep}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
  },
  centerText: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -15 }],
  },
  progressText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  slider: {
    // position: "absolute",
    // bottom: 0,
    width: 150,
  },
});
