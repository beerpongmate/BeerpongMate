import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../../assets/theme";
import ThemedText from "./ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center"
  },
  subTitle: {
    fontSize: 14,
    marginLeft: 25
  },
  horizontalScroll: {
    flexDirection: "column"
  },
  placeholder: {
    height: 220
  }
});

const StatsChart = ({ matchData, style }) => {
  if (matchData.length === 0) {
    return <View style={styles.placeholder} />;
  }

  const matchDataFiltered = matchData.filter(({ hitRate }) => !isNaN(hitRate));
  const dataFormatted = matchDataFiltered.map(({ hitRate }) => hitRate);
  const labels = matchDataFiltered.map(({ win, remainingCups }) => {
    let label = win ? "Win" : "Loss";
    const { 0: team1, 1: team2 } = remainingCups;
    if (team1 === team2) {
      label = "Draw";
    }

    return `${label} \n${team1}:${team2}`;
  });

  const dataPercentage = dataFormatted.map((dec) => dec * 100);

  return (
    <View style={style}>
      <ThemedText style={styles.title}>Recent Matches</ThemedText>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={styles.horizontalScroll}>
          <ThemedText style={styles.subTitle}>Hit%</ThemedText>
          <LineChart
            data={{
              labels,
              datasets: [
                {
                  data: dataPercentage
                }
              ]
            }}
            width={Dimensions.get("window").width * 1.6} // from react-native
            height={220}
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: () => theme.colors.cupRed,
              labelColor: () => theme.colors.cupBlue,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: theme.colors.cupBlue,
                fill: "#fff"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsChart;
