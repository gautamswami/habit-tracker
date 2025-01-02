import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ModalContext } from '../_layout';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// Sample Data
const data = {
  "1/10/2025": [
    {
      completed: 0,
      createdDate: "2025-01-02T04:40:36.679Z",
      description: "",
      frequency: "daily",
      id: 4,
      name: "Insta page progress",
      target: 10,
    },
  ],
  "1/11/2025": [
    {
      completed: 5,
      createdDate: "2025-01-02T04:40:36.679Z",
      description: "",
      frequency: "daily",
      id: 4,
      name: "Insta page progress",
      target: 10,
    },
  ],
  // Add more data as needed
};

// Utility Functions
const getCurrentWeekDates = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Adjust for Sunday as start
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.toLocaleDateString("en-US");
  });
  return weekDates;
};
  
const generateWeeklyReport = (habitsData) => {
  const currentWeekDates = getCurrentWeekDates();
  const report = {};

  for (const [date, habits] of Object.entries(habitsData)) {
    if (currentWeekDates.includes(date)) {
      habits.forEach((habit) => {
        const habitName = habit.name;
        if (!report[habitName]) {
          report[habitName] = {};
          currentWeekDates.forEach((day) => {
            report[habitName][day] = "Pending";
          });
        }

        report[habitName][date] =
          habit.completed >= habit.target ? "Done" : "Not Done";
      });
    }
  }

  return report;
};

const WeeklyReport = () => {
  const [report, setReport] = useState({});
  const context = useContext(ModalContext);
  const { habitsData,setHabitsData} = context;

  useEffect(() => {
    const generatedReport = generateWeeklyReport(habitsData);
    setReport(generatedReport);
  }, [habitsData]);
   
  return (
    <ScrollView style={styles.container}>
      {Object.entries(report).map(([habit, days]) => (
        <View key={habit} style={styles.habitContainer}>
          <Text style={styles.habitName}>{habit}</Text>
          {Object.entries(days).map(([day, status]) => (
            <View
            style={{  alignItems: "center", justifyContent: "center",width:60 }}
          >
            {status == "Done" ? (
              <AntDesign
                name="checkcircle"
                size={24}
                color="lightgreen"
                style={{ textAlign: "center" }}
              />
            ) : (
              <MaterialIcons
                name="cancel"
                size={22}
                color="red"
                style={{ textAlign: "center",marginBottom:1 }}
              />
            )}
            <View style={{borderBottomWidth:1,borderColor:'lightgray',width:60,marginVertical:4}} />
            <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
              {day}
            </Text>
          </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  habitContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#ffffff",
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
  },
  dayStatus: {
    fontSize: 16,
    color: "#555",
  },
});

export default WeeklyReport;
