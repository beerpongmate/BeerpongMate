import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../assets/theme";
import useLobby from "../components/Providers/useLobby";
import { useUser } from "../components/Providers/WithUser";
import getLobbyModel from "../utils/getLobbyModel";
import ThemedText from "../components/ThemedComponents/ThemedText";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import ThemedOverlay from "../components/ThemedOverlay";
import useDiscord from "../components/Providers/useDiscord";
import LobbyComponent from "../components/LobbyComponent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  lobbyContainer: {
    flex: 1,
    margin: 20
  }
});

const OnlineScreen = () => {
  const { navigate } = useNavigation();
  const { user } = useUser();
  const { discord } = useDiscord();
  const { lobbies = [], createLobby, joinLobby } = useLobby({
    userId: user.uid
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleCreate = (playerCount) => {
    setModalVisible(false);
    createLobby(getLobbyModel(user, playerCount)).then((docRef) => {
      navigate("Lobby", { lobbyId: docRef.id });
    });
  };

  const handleJoin = ({ id, matchId, players, playerCount }) => {
    if (Object.keys(players).length < playerCount) {
      joinLobby(id, user).then(() => {
        navigate("Lobby", { lobbyId: id });
      });
    }
  };

  lobbies.sort((a, b) => {
    const aFull = Object.keys(a.players).length === a.playerCount ? 1 : 0;
    const bFull = Object.keys(b.players).length === b.playerCount ? 1 : 0;

    return bFull < aFull;
  });

  console.log(lobbies);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lobbyContainer}>
        <FlatList
          data={lobbies}
          renderItem={({
            item: { id, host, matchId, players, playerCount }
          }) => (
            <LobbyComponent
              onPress={() => handleJoin({ id, matchId, players, playerCount })}
              id={id}
              host={host}
              playerCount={playerCount}
              players={players}
              matchId={matchId}
            />
          )}
        />
      </View>
      <ThemedOverlay
        title="Please select the Lobby settings"
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={{ width: "100%" }}>
          <PrimaryButton
            label="2 vs 2"
            onPress={() => handleCreate(4)}
            color={theme.colors.cupRed}
          />
          <PrimaryButton
            label="1 vs 1"
            onPress={() => handleCreate(2)}
            color={theme.colors.cupBlue}
          />
        </View>
      </ThemedOverlay>
      <PrimaryButton
        onPress={() => setModalVisible(true)}
        color={theme.colors.cupRed}
        label="Create Lobby"
      />
    </SafeAreaView>
  );
};

export default OnlineScreen;
