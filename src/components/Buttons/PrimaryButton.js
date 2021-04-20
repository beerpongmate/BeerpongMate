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

const disabledColor = "grey";

const PrimaryButton = ({
  color,
  onPress,
  label,
  style,
  containerStyle,
  disabled
}) => (
  <View style={[styles.shadow, style]}>
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: disabled ? disabledColor : color }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          styles.innerContainer,
          containerStyle,
          {
            borderColor: disabled ? disabledColor : color,
            backgroundColor: disabled ? disabledColor : color
          }
        ]}
      >
        <ThemedText
          style={[
            styles.textStyle,
            { color: color || disabled ? "#fff" : "black" }
          ]}
        >
          {label}
        </ThemedText>
      </View>
    </TouchableOpacity>
  </View>
);

export default PrimaryButton;
