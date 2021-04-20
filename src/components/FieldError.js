import React from "react";
import { StyleSheet } from "react-native";
import theme from "../../assets/theme";
import ThemedText from "./ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  error: {
    color: theme.colors.cupRed,
    marginVertical: 10,
    textAlign: "center"
  }
});

const FieldError = ({ error }) => (
  <ThemedText style={styles.error}>{error}</ThemedText>
);

export default FieldError;
