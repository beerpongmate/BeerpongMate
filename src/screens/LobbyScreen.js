import React, { useEffect, useRef } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, Button } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import useLobby from "../components/Providers/useLobby";
import useMatch from "../components/Providers/useMatch";
import { useUser } from "../components/Providers/WithUser";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
  },
  lobbyContainer: {},
});

const LobbyScreen = ({ route }) => {
  const { navigate, goBack, dispatch } = useNavigation();
  const { lobbyId } = route.params;
  const { user } = useUser();
  const { lobby, readyUp, startMatch, deleteLobby } = useLobby({
    lobbyId,
    userId: user.uid,
  });
  const { createMatch } = useMatch();
  const lobbyIsLoaded = useRef(false);
  const hasJoinedMatch = useRef(false);

  const players = Object.keys(lobby?.players || {}).map((id) => ({
    uid: id,
    ...lobby.players[id],
  }));

  const isHost = lobby?.host?.uid === user.uid;
  const allReady = !players.some(({ ready }) => !ready);

  const handleStartMatch = () => {
    createMatch({
      players: players.map((value, index) => ({ ...value, team: index })),
      data: {
        throws: { 0: [], 1: [] },
        playerTurn: user.uid,
        order: players.map(({ uid }) => uid),
      },
    }).then((docRef) => {
      startMatch(docRef.id);
    });
  };

  useEffect(() => {
    if (lobby) {
      lobbyIsLoaded.current = true;
    }

    if (!lobby && lobbyIsLoaded.current) {
      goBack();
    }

    if (lobby?.matchId) {
      if (!hasJoinedMatch.current) {
        navigate("Match", { matchId: lobby.matchId });
        hasJoinedMatch.current = true;
      }
    }
  }, [lobby]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={({ uid }) => uid}
        renderItem={({ item: { name, ready } }) => (
          <Text>{`${name} - ${ready ? "Ready" : "Not Ready"}`}</Text>
        )}
      />
      <Button onPress={readyUp} title="Ready" />
      {isHost && <Button onPress={deleteLobby} title="Delete Lobby" />}
      {isHost && allReady && (
        <Button onPress={handleStartMatch} title="Start Match" />
      )}
    </SafeAreaView>
  );
};

export default LobbyScreen;
