import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomTabBar from "./CustomTabBar";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomCalendar from "@/components/CustomCalendar";
export default function CalendarFunction() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: "row", alignItems: "center",marginBottom:30 }}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="white"
          style={{ width: 30 }}
        />
        <Text style={{ color: "white", fontSize: 20 }}>Back</Text>
      </TouchableOpacity>
      {/* <Calendar
        style={{
          height: 350,
          color:"white"
        }}
        current={"2025-01-01"}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        markedDates={{
          "2025-01-01": { selected: true, marked: true, selectedColor: "blue" },
          "2025-01-04": { marked: true },
          "2025-01-06": { selected: true, marked: true, selectedColor: "green" },
        }}
      /> */}
      <CustomCalendar highlightedDates={['2024-12-25', '2024-12-31']} />

      <Text>SAMPLE TEXT</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal:20
  },
});
