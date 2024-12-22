import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const ToggleSwitch = ({ label, value, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "white" }}
        thumbColor={value ? "#7C55FE" : "white"}
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#262626",
    borderRadius: 10,
    marginVertical: 5,
  },
  label: {
    color: "white",
    fontSize: 18,
  },
});

export default ToggleSwitch; 