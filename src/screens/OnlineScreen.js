import React from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../assets/theme";
import useLobby from "../components/Providers/useLobby";
import { useUser } from "../components/Providers/WithUser";
import getLobbyModel from "../utils/getLobbyModel";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  lobbyContainer: {
    flex: 1,
    backgroundColor: theme.colors.table,
    margin: 30,
    padding: 20,
  },
  lobby: {
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  lobbyLabel: {
    color: theme.colors.table,
  },
});

const OnlineScreen = () => {
  const { navigate } = useNavigation();
  const { user } = useUser();
  const { lobbies = [], createLobby, joinLobby } = useLobby({
    userId: user.uid,
  });

  const handleCreate = () => {
    createLobby(getLobbyModel(user)).then((docRef) => {
      navigate("Lobby", { lobbyId: docRef.id });
    });
  };

  const handleJoin = ({ id, matchId, players }) => {
    console.log(matchId);
    console.log(players);
    joinLobby(id, user).then(() => {
      navigate("Lobby", { lobbyId: id });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lobbyContainer}>
        <FlatList
          data={lobbies}
          renderItem={({
            item: {
              id,
              host,
              matchId,
              players
            },
          }) => (
            <TouchableOpacity
              onPress={() => handleJoin({id, matchId, players})}
              key={id}
              style={styles.lobby}
            >
              <Text style={styles.lobbyLabel}>{`${host?.name}'s Lobby`}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Button onPress={handleCreate} title="Create Lobby" />
    </SafeAreaView>
  );
};

export default OnlineScreen;
