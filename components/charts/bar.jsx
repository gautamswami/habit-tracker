import React from "react";
import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function BarChartCustom() {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"],
    datasets: [
      {
        data: [3, 4, 6, 0, 2, 4,5],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "black",
    backgroundGradientFromOpacity: 0.4,
    backgroundGradientTo: "black",
    backgroundGradientToOpacity: 0.9,
    color: (opacity = 1) => `rgba(154, 95, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0, // optiona
    useShadowColorFromDataset: false, // optional
  };
  const graphStyle = {
    backgroundColor: "#1E1E1E", // Background color of the graph
    color: {
      // Colors for the graph lines or bars
      line: "#FFB254", // Line color
      fill: "#5826FF", // Fill color for area charts
      grid: "#444444", // Grid line color
      text: "#FFFFFF", // Text color for labels
    },
    strokeWidth: 2, // Width of the line
    barWidth: 20, // Width of the bars (if using a bar chart)
    borderRadius: 5, // Border radius for bars
  };

  return (
    <View>
      <BarChart
        style={graphStyle}
        data={data}
        width={Dimensions.get("window").width - 20}
        height={220}
        // yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />
    </View>
  );
}
