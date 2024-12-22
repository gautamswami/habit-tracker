import React from "react";
import {   StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomTabBar from "../../components/CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import BezierChartCustom from "@/components/charts/bezier";
import ProgressChartCustom from "@/components/charts/progress";
import BarChartCustom from "@/components/charts/bar";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import SingleChartCustom from "@/components/charts/single";


export default function Chart() {
  const scrollRef = useAnimatedRef();
  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={20}
        contentContainerStyle={{ padding: 10, paddingBottom: 160 }}
      >
      <Text style={{color:"white",fontSize:20}}>Number of task done daily</Text>
      <BezierChartCustom />
      <Text style={{color:"white",fontSize:20}}>Habits progress this week</Text>
      <ProgressChartCustom/>
      <Text style={{color:"white",fontSize:20}}>Water this week</Text>
      <BarChartCustom />
      <Text style={{color:"white",fontSize:20}}>Meditation this week</Text>
      <SingleChartCustom />
      </Animated.ScrollView>
      <CustomTabBar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'black',
    }
})