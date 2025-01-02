import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomCalendar from "@/components/CustomCalendar";
import Completed from "@/components/home/completed";
import CustomTabBar from "@/components/CustomTabBar";
export default function CalendarFunction() {
    const navigation = useNavigation();
    const [calendarDate, setCalendarDate] = useState("");
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 20 }}>
                {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: "row", alignItems: "center",marginBottom:30 }}
      >
        <Ionicons
          name="caret-back-outline"
          size={24}
          color="white"
          style={{ width: 30 }}
        />
        <Text style={{ color: "white", fontSize: 20 }}>Back</Text>
      </TouchableOpacity> */}
                <CustomCalendar
                    calendarDate={calendarDate}
                    setCalendarDate={setCalendarDate}
                />
                <Completed
                    calendarDate={calendarDate}
                    setCalendarDate={setCalendarDate}
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
    },
});
