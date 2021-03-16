import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import Cup from "./Cup";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

const CupRowContainer = ({
  cupSize,
  cupRow,
  onPress,
  onAnimation,
  disablePress,
  resetPending
}) => (
  <View
    style={[
      styles.container,
      { marginVertical: -cupSize * 0.07, zIndex: cupRow.length },
    ]}
  >
    {cupRow.map((data) => (
      <Cup
        cupSize={cupSize}
        onPress={onPress}
        onAnimation={onAnimation}
        key={data?.id}
        data={data}
        disablePress={disablePress}
        resetPending={resetPending}
      />
    ))}
  </View>
);

export default CupRowContainer;
