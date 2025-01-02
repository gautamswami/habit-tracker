import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import moment from "moment";
import { ModalContext } from "../_layout";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const habitsData = {
  "1/1/2025": [
    {
      completed: 0,
      createdDate: "2025-01-02T04:40:36.679Z",
      description: "",
      frequency: "daily",
      id: 4,
      name: "Meditation",
      target: 1,
    },
  ],
  "1/2/2025": [
    {
      completed: 1,
      createdDate: "2025-01-02T04:40:36.679Z",
      description: "",
      frequency: "daily",
      id: 4,
      name: "Meditation",
      target: 1,
    },
  ],
};

const App = () => {
  const today = moment("2025-01-02"); // Set today's date (for testing purposes)
    const {habitsData} = useContext(ModalContext);
  // Generate the current week's dates (Monday to Sunday)
  const startOfWeek = today.clone().startOf("week").add(1, "day"); // Monday
  const endOfWeek = today.clone().endOf("week"); // Sunday
  const weekDates = [];
  for (let date = startOfWeek; date.isBefore(endOfWeek); date.add(1, "day")) {
    weekDates.push(date.clone());
  }

  // Generate the weekly report for each habit
  const generateWeeklyReport = (habitName) => {

    const report = weekDates.map((date) => {
      const formattedDate = date.format("M/D/YYYY");
      const habitsForDay = habitsData[formattedDate] || [];
      const habit = habitsForDay.find((h) => h.name === habitName);

      if (habit) {
        return habit.completed ? "DONE" : "NOT DONE";
      }
      return "___";
    });

    return report;
  };

  // Get all unique habit names
  const uniqueHabits = Array.from(
    new Set(
      Object.values(habitsData)
        .flat()
        .map((habit) => habit.name)
    )
  );

  const renderHabitReport = ({ item: habitName }) => {
    const report = generateWeeklyReport(habitName);

    return (
      <View style={{marginBottom:40,marginTop:20}}>
        <Text style={{color:"white",fontSize:21,marginBottom:20}}>{habitName} this week</Text>
        <View style={{ flexDirection: "row"}}>
        {weekDates.map((date, index) => (
          <View
          key={index}
          style={{  alignItems: "center", justifyContent: "center",width:60 }}
        >
          {report[index] == "DONE" ? (
            <AntDesign
              name="checkcircle"
              size={24}
              color="lightgreen"
              style={{ textAlign: "center" }}
            />
          ) : report[index] === "___" ?   <AntDesign
          name="checkcircle"
          size={24}
          color="black"
          style={{ textAlign: "center" }}
        /> : (
            <MaterialIcons
              name="cancel"
              size={22}
              color="red"
              style={{ textAlign: "center",marginBottom:1 }}
            />
          )}
          <View style={{borderBottomWidth:1,borderColor:'lightgray',width:60,marginVertical:4}} />
          <Text style={{ color: "white", fontSize: 12, textAlign: "center" }}>
          {date.format("ddd")}
          </Text>
        </View>
        ))}
        </View>
      </View>
    );
  };

  return (
    <View >
      <FlatList
        data={uniqueHabits}
        keyExtractor={(item) => item}
        renderItem={renderHabitReport}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  habitName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  reportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  dayText: {
    fontSize: 14,
    color: "#555",
  },
});

export default App;
