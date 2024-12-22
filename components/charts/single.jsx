import React from "react";
import { FlatList, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function SingleChartCustom() {
  const chartdata = [
    { name: "Sun", val: true },
    { name: "Mon", val: false },
    { name: "Tue", val: true },
    { name: "Thu", val: true },
    { name: "Fri", val: false },
    { name: "Sat", val: true },
  ];
  const renderItem = ({ item }) => {
    return (
      <View
        style={{  alignItems: "center", justifyContent: "center",width:60 }}
      >
        {item?.val ? (
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
          {item?.name}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flexDirection: "row", width: "100%"}}>
      <FlatList
        data={chartdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 30, gap: 20 }}
      />
      {/* <View>
        <AntDesign name="checkcircle" size={24} color="green" />
        <Text>Sun</Text>
      </View>
      <View>
        <MaterialIcons name="cancel" size={24} color="red" />
        <Text>Mon</Text>
      </View> */}
    </View>
  );
}
