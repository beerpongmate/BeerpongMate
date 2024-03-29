import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity} from "react-native";
import theme from "../../assets/theme";
import StatItem from "./StatItem";
import ThemedText from "./ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  counter: {
    textAlign: "center",
  },
  tableBorder: {
    flex: 1,
    margin: 15,
    marginTop: 1,
    borderColor: theme.colors.tableOuterBorder,
    borderWidth: 5,
    borderTopWidth: 3,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 1,
  },
  table: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.colors.tableInnerBorder,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: theme.colors.cupRed,
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  playerName: {
    fontSize: 24,
    color: "#fff",
  },
  button: {
    marginTop: 5,
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#fff",
    borderStyle: "dashed",
    alignSelf: "center",
  },
});

const StatsContainer = ({ stats = {}, playerId }) => {
  const { name, throwCount, hitCount, streak } = stats[playerId] || {};

  const hitRatio = (hitCount / throwCount).toFixed(2);

  const hitRatioDisplay = hitRatio === 'NaN' ? 0 : hitRatio;

  return (
    <View style={styles.tableBorder}>
      <View style={styles.table}>
        <ScrollView>
          <View>
            <View style={styles.row}>
              <StatItem stat={throwCount} iconName="circle" label="Throws" />
              <StatItem stat={hitCount} iconName="cup" label="Hits" />
            </View>
            <View style={styles.row}>
              <StatItem stat={streak} iconName="fire" label="Streak" />
              <StatItem stat={hitRatioDisplay} iconName="arm-flex" label="Hit Ratio" />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default StatsContainer;
