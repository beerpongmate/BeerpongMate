import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import ThemedText from "../ThemedComponents/ThemedText";

const borderWidth = 1;

const styles = StyleSheet.create({
  container: {
    borderWidth,
    borderColor: "red",
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 6,
    padding: 2,
    backgroundColor: "#fff"
  },
  innerContainer: {
    borderWidth,
    borderRadius: 5,
    borderColor: "red",
    padding: 10
  },
  textStyle: {
    fontSize: 24,
    textAlign: "center"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.22,
    elevation: 2
  }
});

const PrimaryButton = ({ color, onPress, label, style, containerStyle }) => (
  <View style={[styles.shadow, style]}>
    <TouchableOpacity
      style={[styles.container, { borderColor: color }]}
      onPress={onPress}
    >
      <View
        style={[
          styles.innerContainer,
          containerStyle,
          { borderColor: color, backgroundColor: color }
        ]}
      >
        <ThemedText
          style={[styles.textStyle, { color: color ? "#fff" : "black" }]}
        >
          {label}
        </ThemedText>
      </View>
    </TouchableOpacity>
  </View>
);

export default PrimaryButton;
