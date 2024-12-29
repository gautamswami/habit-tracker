import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomTabBar from "../../components/CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import ToggleSwitch from "./ToggleSwitch";

export default function Setting() {
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [chartLevel, setChartLevel] = useState("weekly");
  const [taskChart, setTaskChart] = useState(true);
  const [habitsProgressChart, setHabitsProgressChart] = useState(true);
  const [individualHabitChart, setIndividualHabitChart] = useState(true);
  const [theme, setTheme] = useState("light");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
      <Text style={styles.title}>Settings</Text>
      <ToggleSwitch
        label="Receive Notifications"
        value={receiveNotifications}
        onToggle={() => setReceiveNotifications((prev) => !prev)}
      />
      <ToggleSwitch
        label="Show monthly chart by default"
        value={chartLevel === "monthly"}
        onToggle={() => setChartLevel((prev) => (prev === "weekly" ? "monthly" : "weekly"))}
      />
      <ToggleSwitch
        label="Number of Task Chart"
        value={taskChart}
        onToggle={() => setTaskChart((prev) => !prev)}
      />
      <ToggleSwitch
        label="Habits Progress Chart"
        value={habitsProgressChart}
        onToggle={() => setHabitsProgressChart((prev) => !prev)}
      />
      <ToggleSwitch
        label="Individual Habit Chart"
        value={individualHabitChart}
        onToggle={() => setIndividualHabitChart((prev) => !prev)}
      />
      <ToggleSwitch
        label="Light theme"
        value={theme === "dark"}
        onToggle={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />
      </View>
      <CustomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});