import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function BezierChartCustom() {
  return (
    <View>
      <LineChart
        data={{
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"],
          datasets: [
            {
              data: [
                6,5,1,3,6,0,2
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width-20} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "black",
          backgroundGradientTo: "#9A5FFF",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
