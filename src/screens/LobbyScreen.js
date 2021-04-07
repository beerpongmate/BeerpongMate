import React, { useEffect, useRef } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Clipboard from '@react-native-clipboard/clipboard';
import useLobby from "../components/Providers/useLobby";
import useMatch from "../components/Providers/useMatch";
import { useUser } from "../components/Providers/WithUser";
import TeamsList from "../components/TeamsList";
import BeerpongTable from "../../assets/rnsvg/BeerpongTable";
import ThemedText from "../components/ThemedComponents/ThemedText";


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  lobbyContainer: {},
  imageContainer: {
    alignItems: 'center'
  }
});

const LobbyScreen = ({ route }) => {
  const { navigate, goBack } = useNavigation();
  const { lobbyId } = route.params;
  const { user } = useUser();
  const { lobby, readyUp, startMatch, deleteLobby, joinTeam } = useLobby({
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
      players,
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
      if (lobby?.players[user.uid]?.team === undefined) {
        joinTeam().then().catch(console.log);
      }
    }

    if (!lobby && lobbyIsLoaded.current) {
      goBack();
    }

    if (lobby?.matchId) {
      if (!hasJoinedMatch.current) {
        navigate("Match", { matchId: lobby.matchId, lobbyId });
        hasJoinedMatch.current = true;
      }
    }
  }, [lobby]);

  const copyToClipboard = () => {
    Clipboard.setString(lobby?.channel?.invite);
  }

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <TeamsList players={players} />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={copyToClipboard}>
            <ThemedText>{lobby?.channel?.invite}</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <BeerpongTable width="80%" />
        </View>
        <Button onPress={readyUp} title="Ready" />
        {isHost && <Button onPress={deleteLobby} title="Delete Lobby" />}
        {isHost && allReady && (
        <Button onPress={handleStartMatch} title="Start Match" />
      )}
      </SafeAreaView>
    </View>
  );
};

export default LobbyScreen;
