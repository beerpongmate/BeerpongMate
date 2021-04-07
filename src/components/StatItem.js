import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ThemedText from "./ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textCenter: {
    textAlign: "center",
    color: "#fff",
  },
  label: {
    fontSize: 18,
  },
  stat: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

const StatItem = ({ stat, iconName, label }) => (
  <View style={styles.container}>
    <Icon name={iconName} size={42} color="#fff" />
    <ThemedText style={[styles.textCenter, styles.stat]}>{stat}</ThemedText>
    <ThemedText style={[styles.textCenter, styles.label]}>{label}</ThemedText>
  </View>
);

export default StatItem;
