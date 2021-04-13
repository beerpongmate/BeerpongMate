import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import theme from "../../assets/theme";
import ThemedText from "./ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  lobby: {
    padding: 15,
    width: "100%",
    backgroundColor: theme.colors.cupBlue,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  lobbyLabel: {
    color: "#fff",
    fontSize: 24
  },
  playerLabel: {
    color: "#fff",
    fontSize: 26
  },
  status: {
    color: "#fff"
  },
  playerText: {
    color: "#fff"
  },
  playerContainer: {
    alignItems: "flex-end"
  }
});

const LobbyComponent = ({
  onPress,
  host,
  id,
  playerCount,
  players,
  matchId
}) => {
  console.log("INLOBBY", players);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={playerCount === Object.keys(players).length}
      key={id}
      style={[
        styles.lobby,
        {
          backgroundColor:
            playerCount === Object.keys(players).length
              ? "grey"
              : theme.colors.cupBlue
        }
      ]}
    >
      <View>
        <ThemedText style={styles.lobbyLabel}>
          {`${host?.name}'s Lobby`}
        </ThemedText>
        <ThemedText style={styles.status}>
          {matchId ? "Match in Progress" : "Waiting for Players"}
        </ThemedText>
      </View>
      <View style={styles.playerContainer}>
        <ThemedText style={styles.playerLabel}>
          {Object.keys(players).length}
          /
          {playerCount}
        </ThemedText>
        <ThemedText style={styles.playerText}>Players</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default LobbyComponent;
