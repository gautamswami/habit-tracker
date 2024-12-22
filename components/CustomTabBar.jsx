import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import HelloModal from "../app/(tabs)/HelloModal";

const CustomTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <HelloModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("index")}
          style={[styles.tabButton, route.name === "index" && styles.activeTab]}
        >
          <Octicons name="home" size={28} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("chart")}
          style={[styles.tabButton, route.name === "chart" && styles.activeTab]}
        >
          <FontAwesome6 name="chart-simple" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          // onPress={() => navigation.navigate("chart")}
          style={[styles.tabButton, styles.centerOuter]}
        >
          <LinearGradient
            colors={["#FFB254", "#5826FF", "#9000FF"]}
            style={styles.centerButton}
          >
            <Entypo name="plus" size={32} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("notification")}
          style={[
            styles.tabButton,
            route.name === "notification" && styles.activeTab,
          ]}
        >
          <Ionicons name="notifications-outline" size={28} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("setting")}
          style={[
            styles.tabButton,
            route.name === "setting" && styles.activeTab,
          ]}
        >
          <Octicons name="gear" size={28} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "transparent",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#7C55FE",
    paddingVertical: 10,
    width: "90%",
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tabButton: {
    alignItems: "center",
    width: "15%",
    position: "relative",
    padding: 5,
  },
  activeTab: {
    backgroundColor: "#30148D",
    borderRadius: 40,
    padding: 5,
    shadowColor: "#30148D",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  centerOuter: {},
  centerButton: {
    position: "absolute",
    backgroundColor: "#5826FF",
    width: 60,
    height: 60,
    top: "-150%",
    left: "-10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default CustomTabBar;
