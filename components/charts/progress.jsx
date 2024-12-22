import React from "react";
import { Dimensions, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

export default function ProgressChartCustom() {
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8],
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(154, 95, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View>
      <ProgressChart
        data={data}
        width={Dimensions.get("window").width-20}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
}
