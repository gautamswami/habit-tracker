import React, { useState } from "react";
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

export default function App() {
  const navigation = useNavigation();

  // Get current date and time
  const now = new Date();
  const hours = now.getHours();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
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

  const [habits, setHabits] = useState([
    { name: "Water", target: 4, completed: 0 },
    { name: "Water", target: 4, completed: 0 },
    { name: "Water", target: 4, completed: 0 },
  ]);

  const renderItem = ({ item }) => {
    const isToday = item.getDate() === selectedDate;
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
            setSelectedDate(item.getDate());
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
          initialScrollIndex={Math.max(selectedDate - 3, 0)}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 65 * index,
            index,
          })}
          style={{ marginVertical: 30 }}
        />
        <Completed />
        <View>
          <View style={{ marginTop: 20 }}>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {habits?.map((habit, id) => {
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
                      }}
                    >
                      <Feather name="droplet" size={25} color="white" />
                      <Text style={{ color: "white", fontSize: 20 }}>
                        {habit?.name}
                      </Text>
                    </View>
                    <CircularProgress
                      progress={waterProgress}
                      onProgressChange={setWaterProgress}
                    />
                  </View>
                );
              })}
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
