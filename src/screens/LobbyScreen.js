import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import partition from "lodash/partition";
import sortBy from "lodash/sortBy";
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
    backgroundColor: "#fff"
  },
  lobbyContainer: {},
  imageContainer: {
    alignItems: "center",
    flex: 1
  },
  inviteContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    alignItems: "center"
  },
  inviteCode: {
    fontSize: 20
  },
  inviteLabel: {
    color: "grey",
    fontSize: 16
  }
});

const LobbyScreen = ({ navigation, route }) => {
  const { navigate, goBack } = useNavigation();
  const { lobbyId } = route.params;
  const { user } = useUser();
  const { lobby, readyUp, startMatch, deleteLobby, joinTeam } = useLobby({
    lobbyId,
    userId: user.uid
  });
  const { createMatch } = useMatch();
  const { inviteKey } = lobby || {};
  const lobbyIsLoaded = useRef(false);
  const hasJoinedMatch = useRef(false);

  const players = Object.keys(lobby?.players || {}).map((id) => ({
    uid: id,
    ...lobby.players[id]
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

  const copyInvite = () => {
    Clipboard.setString(inviteKey);
  };

  const handleStartMatch = () => {
    const sortedOrder = sortBy(players, ({ team }) => team).map(
      ({ uid }) => uid
    );
    createMatch({
      players,
      data: {
        throws: { 0: [], 1: [] },
        playerTurn: sortedOrder[0],
        order: sortedOrder
      }
    }).then((docRef) => {
      startMatch(docRef.id);
    });
  };

  useEffect(() => {
    if (lobby) {
      if (isHost) {
        navigation.setOptions({
          headerBackTitle: "Delete"
        });
      }
      navigation.setOptions({
        headerTitle: () => (
          <ThemedText
            style={{ fontSize: 18, width: "100%", textAlign: "right" }}
          >
            {`${lobby?.host?.name}'s Lobby`}
          </ThemedText>
        )
      });
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

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <TeamsList
          players={players}
          playerCount={Math.round(playerCount * 0.5)}
          team={0}
        />
        <View style={styles.imageContainer}>
          <BeerpongTable size="100%" />
        </View>
        <TeamsList
          players={players}
          playerCount={Math.round(playerCount * 0.5)}
          team={1}
        />
        {inviteKey && (
          <TouchableOpacity style={styles.inviteContainer} onPress={copyInvite}>
            <ThemedText style={styles.inviteCode}>
              {"Invite Code: "}
              {inviteKey}
            </ThemedText>
            <ThemedText style={styles.inviteLabel}>
              Press to copy to clipboard
            </ThemedText>
          </TouchableOpacity>
        )}
        <PrimaryButton
          onPress={readyUp}
          color={theme.colors.cupRed}
          label="Ready"
        />
        {isHost && allReady && teamsAreEven && matchIsFull && (
          <PrimaryButton
            onPress={handleStartMatch}
            color={theme.colors.cupBlue}
            label="Start Match"
          />
        )}
        <PrimaryButton onPress={changeTeam} label="Change Team" />
      </SafeAreaView>
    </View>
  );
};

export default LobbyScreen;
