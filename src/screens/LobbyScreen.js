import React, { useEffect, useRef } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Clipboard from '@react-native-clipboard/clipboard';
import partition from 'lodash/partition';
import useLobby from "../components/Providers/useLobby";
import useMatch from "../components/Providers/useMatch";
import { useUser } from "../components/Providers/WithUser";
import TeamsList from "../components/TeamsList";
import BeerpongTable from "../../assets/rnsvg/BeerpongTable";
import ThemedText from "../components/ThemedComponents/ThemedText";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import theme from "../../assets/theme";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lobbyContainer: {},
  imageContainer: {
    alignItems: 'center',
    flex: 1
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

  const [team0, team1] = partition(players, ({ team }) => team === 0);
  
  const playerCount = lobby?.playerCount || 4;

  const teamsAreEven = team0.length === team1.length;
  const matchIsFull = players.length === playerCount;

  const isHost = lobby?.host?.uid === user.uid;
  const allReady = !players.some(({ ready }) => !ready);
  const userTeam = lobby?.players[user.uid]?.team;

  const changeTeam = () => {
    const teamToJoin = userTeam ? 0 : 1;
    joinTeam(teamToJoin).catch(console.log);
  };

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
      if (userTeam === undefined) {
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
        <TeamsList players={players} playerCount={Math.round(playerCount * 0.5)} team={0} />
        <View style={styles.imageContainer}>
          <BeerpongTable size="100%" />
        </View>
        <TeamsList players={players} playerCount={Math.round(playerCount * 0.5)} team={1} />
        <View>
          <TouchableOpacity onPress={copyToClipboard}>
            <ThemedText>{lobby?.channel?.invite}</ThemedText>
          </TouchableOpacity>
        </View>
        <PrimaryButton onPress={readyUp} color={theme.colors.cupRed} label="Ready" />
        {isHost && allReady && teamsAreEven && matchIsFull && (
          <PrimaryButton onPress={handleStartMatch} color={theme.colors.cupBlue} label="Start Match" />
        )}
        <PrimaryButton onPress={changeTeam} label="Change Team" />
        {isHost && <PrimaryButton onPress={deleteLobby} label="Delete Lobby" />}
      </SafeAreaView>
    </View>
  );
};

export default LobbyScreen;
