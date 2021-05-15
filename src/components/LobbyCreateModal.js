import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import theme from "../../assets/theme";
import PrimaryButton from "./Buttons/PrimaryButton";
import ThemedText from "./ThemedComponents/ThemedText";
import ThemedOverlay from "./ThemedOverlay";

const styles = StyleSheet.create({
  privateContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  privateCheckbox: {
    marginBottom: 8
  },
  privateLabel: {
    fontSize: 18
  }
});

const LobbyCreateModal = ({ setModalVisible, modalVisible, handleCreate }) => {
  const [isPrivate, setPrivate] = useState(false);

  return (
    <ThemedOverlay
      title="Please select the Lobby settings"
      visible={modalVisible}
      onDismiss={() => setModalVisible(false)}
    >
      <View style={{ width: "100%" }}>
        <PrimaryButton
          label="2 vs 2"
          onPress={() => handleCreate(4, isPrivate)}
          color={theme.colors.cupRed}
        />
        <PrimaryButton
          label="1 vs 1"
          onPress={() => handleCreate(2, isPrivate)}
          color={theme.colors.cupBlue}
        />
        <View style={styles.privateContainer}>
          <CheckBox
            style={styles.privateCheckbox}
            value={isPrivate}
            onValueChange={setPrivate}
          />
          <ThemedText style={styles.privateLabel}>
            Set this Lobby to private
          </ThemedText>
        </View>
      </View>
    </ThemedOverlay>
  );
};

export default LobbyCreateModal;
