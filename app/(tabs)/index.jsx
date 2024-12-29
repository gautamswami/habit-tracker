import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTabBar from "../../components/CustomTabBar";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import CircularProgress from "@/components/CircularProgress";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import Completed from "@/components/home/completed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelloModal from "@/components/HelloModal";

import { ModalContext } from "../_layout";
import NoData from "@/assets/icons/nodata";
export default function App() {
  const navigation = useNavigation();

  const context = useContext(ModalContext)
  const { modalVisible, setModalVisible, homeData, setHomeData,completeData,setCompleteData ,selectedDate, setSelectedDate,habitsData,setHabitsData} = context;

  // Get current date and time
  const now = new Date();
  const hours = now.getHours();
  const [waterProgress, setWaterProgress] = useState(0);
  const [meditationProgress, setMeditationProgress] = useState(0.1);

  // Get day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[now.getDay()]; // Get day of the week
  const date = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }); // Format date
  // Determine greeting based on time of day
  let greeting;
  if (hours < 12) {
    greeting = "Good Morning ⛅️";
  } else if (hours < 18) {
    greeting = "Good Afternoon ☀️";
  } else {
    greeting = "Good Evening 🌔";
  }
  const getDatesOfMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const dates = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }

    return dates;
  };

  const dates = getDatesOfMonth();

  const renderItem = ({ item }) => {
    const isToday = item.toLocaleDateString() === selectedDate;
    return (
      <LinearGradient
        colors={["#9B43FF", "#88D7F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          alignItems: "center",
          marginHorizontal: 5,
          backgroundColor: isToday ? "#30148D" : "transparent",
          width: 55,
          height: 55,
          borderRadius: 50,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedDate(item.toLocaleDateString());
          }}
          style={{
            alignItems: "center",
            marginHorizontal: 5,
            backgroundColor: isToday ? "#4B2CB3" : "black",
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: isToday ? "white" : "white",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {item.getDate()}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const scrollRef = useAnimatedRef();

  const storeData = async (value,key) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const [habitsForSelectedDate, setHabitsForSelectedDate] = useState([]);
  useEffect(() => {
    setHabitsForSelectedDate(getHabitsForSelectedDate());
  }, [selectedDate]);

  const getHabitsForSelectedDate = () => {
    return habitsData[selectedDate] || [];
  };


  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={20}
        contentContainerStyle={{ padding: 10, paddingBottom: 160 }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "60%" }}>
            <Text style={{ color: "white", fontSize: 28, fontWeight: "600" }}>
              {greeting}
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
              {dayOfWeek}, {date}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("calendar")}
            style={{ width: "15%" }}
          >
            <EvilIcons name="calendar" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={dates}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: "center" }}
          initialScrollIndex={Math.max(selectedDate.split("/")[1] - 3, 0)}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 65 * index,
            index,
          })}
          style={{ marginVertical: 30 }}
        />
        {selectedDate <= new Date().toLocaleDateString() && <Completed />}
        <View>
          <View style={{ marginTop: 20 }}>
            {habitsForSelectedDate.length > 0 && (
              <Text
                style={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: "600",
                  marginBottom: 20,
                }}
              >
                Habits
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <HelloModal
                visible={modalVisible.state}
                onClose={() =>
                  setModalVisible({ ...modalVisible, state: false })
                }
                modalVisible={modalVisible}
              />
              {habitsForSelectedDate.length > 0 ? (
                <>
                  {habitsForSelectedDate.map((habit, id) => {
                    return (
                      <View
                        style={{
                          width: "48%",
                          backgroundColor: "#262626",
                          padding: 10,
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                        key={`habit-${id}`}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                            width: "100%",
                            marginBottom: 10,
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              width: "75%",
                              alignItems: "center",
                            }}
                          >
                            <Feather name="droplet" size={25} color="white" />
                            <Text style={{ color: "white", fontSize: 20 }}>
                              {habit?.name}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              setModalVisible({
                                action: "Edit",
                                state: true,
                                data: habit,
                                id: id,
                              });
                            }}
                          >
                            <Feather name="settings" size={15} color="white" />
                          </TouchableOpacity>
                        </View>
                        <CircularProgress
                          current={
                            selectedDate <= new Date().toLocaleDateString()
                              ? parseInt(habit?.completed)
                              : 0
                          }
                          disabled={selectedDate !== new Date().toLocaleDateString()}
                          target={parseInt(habit?.target)}
                          progress={habit?.completed || 0}
                          onProgressChange={(progress) => {
                            const newHabits = habitsForSelectedDate.map(
                              (item, index) => {
                                if (index === id) {
                                  return {
                                    ...item,
                                    completed: progress,
                                  };
                                }
                                return item;
                              }
                            );
                            const updatedHabitsData = {
                              ...habitsData,
                              [selectedDate]: newHabits,
                            };
                            setHabitsData(updatedHabitsData);
                            storeData(updatedHabitsData, "habits-data");

                            const newCompleteData = { ...completeData };
                            const createdDate = selectedDate;

                            if (progress >= habit?.target) {
                              newCompleteData[createdDate] = {
                                ...newCompleteData[createdDate],
                                [habit.name]: habit,
                              };
                            } else {
                              if (
                                newCompleteData[createdDate] &&
                                newCompleteData[createdDate][habit.name]
                              ) {
                                delete newCompleteData[createdDate][habit.name];
                                if (
                                  Object.keys(
                                    newCompleteData[createdDate]
                                  ).length === 0
                                ) {
                                  delete newCompleteData[createdDate];
                                }
                              }
                            }
                            setCompleteData(newCompleteData);
                            storeData(newCompleteData, "completed-habits");
                          }}
                        />
                      </View>
                    );
                  })}
                </>
              ) : (
                <View
                  style={{
                    minWidth: 300,
                    height: 200,
                    marginTop: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  <NoData />
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 22,
                      marginTop: 10,
                    }}
                  >
                    No habits
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
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
