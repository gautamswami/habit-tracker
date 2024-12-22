import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Example icon library

const NotificationItem = ({ icon, text, isUnread }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          name={icon}
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
      {isUnread && <View style={styles.dot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#262626",
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: "space-between",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default NotificationItem;
