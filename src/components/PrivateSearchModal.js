import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import theme from "../../assets/theme";
import PrimaryButton from "./Buttons/PrimaryButton";
import FieldError from "./FieldError";
import { useUser } from "./Providers/WithUser";
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
  },
  inputfield: {
    marginVertical: 15,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.cupBlue,
    fontSize: 18,
    height: 50,
    fontWeight: "bold"
  }
});

const PrivateSearchModal = ({
  setModalVisible,
  modalVisible,
  findLobby,
  joinLobby
}) => {
  const [inviteKey, setInviteKey] = useState("");
  const [joinError, setJoinError] = useState("");

  const handleJoin = () => {
    findLobby(inviteKey)
      .then((lobby) => {
        const success = joinLobby({
          id: lobby?.id,
          players: lobby?.players,
          playerCount: lobby?.playerCount
        });
        if (success) {
          setModalVisible(false);
        } else {
          setJoinError("The Lobby is already full.");
        }
      })
      .catch((error) => {
        setJoinError(error);
      });
  };

  return (
    <ThemedOverlay
      title="Please enter your invite code"
      visible={modalVisible}
      onDismiss={() => setModalVisible(false)}
    >
      <View style={{ width: "100%" }}>
        <TextInput
          style={styles.inputfield}
          placeholder="Invite Code"
          onChangeText={(text) => {
            setInviteKey(text);
            setJoinError("");
          }}
          placeholderTextColor="grey"
          textAlign="center"
          autoCapitalize="none"
        />
        <FieldError error={joinError} />
        <PrimaryButton
          disabled={!inviteKey}
          label="Join Private Match"
          onPress={handleJoin}
          color={theme.colors.cupRed}
        />
      </View>
    </ThemedOverlay>
  );
};

export default PrivateSearchModal;
