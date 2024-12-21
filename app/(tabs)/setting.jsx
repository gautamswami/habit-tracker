import React from "react";
import {  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomTabBar from "./CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SAMPLE TEXT</Text>
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