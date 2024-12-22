import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import CustomTabBar from "../../components/CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationItem from "./NotificationItem";
import Animated, { useAnimatedRef } from "react-native-reanimated";

const notifications = [
  {
    id: "1",
    icon: "notifications",
    text: "You have a new message",
    isUnread: true,
  },
  {
    id: "2",
    icon: "event",
    text: "Your event starts in 1 hour",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
  {
    id: "3",
    icon: "check-circle",
    text: "Task completed successfully",
    isUnread: false,
  },
];

export default function Notification() {
  const scrollRef = useAnimatedRef();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            icon={item.icon}
            text={item.text}
            isUnread={item.isUnread}
          />
        )}
        keyExtractor={(item,index) => `item-${index}`+item.id}
        ListHeaderComponent={
          <Text style={{ color: "white", fontSize: 25, fontWeight: 500, marginBottom: 20 }}>
            Notifications 🔔
          </Text>
        }
        contentContainerStyle={{ padding: 10, paddingBottom: 160 }}
      />
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
