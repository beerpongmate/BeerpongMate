import React from 'react';
import {
  View, SafeAreaView, FlatList, Text, Button, StyleSheet, TouchableOpacity,
} from 'react-native';
import theme from '../../assets/theme';
import useLobby from '../components/Providers/useLobby';
import { useUser } from '../components/Providers/WithUser';
import getLobbyModel from '../utils/getLobbyModel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: '100%',
    backgroundColor: '#fff',
  },
  lobbyLabel: {
    color: theme.colors.table,
  },
});

const OnlineScreen = () => {
  const { lobbies = [], createLobby } = useLobby();
  const { user } = useUser();

  const handleCreate = () => {
    createLobby(getLobbyModel(user));
  };

  console.log(lobbies);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lobbyContainer}>
        <FlatList data={lobbies} renderItem={({ item: { host: { name } } }) => <TouchableOpacity style={styles.lobby}><Text style={styles.lobbyLabel}>{`${name}'s Lobby`}</Text></TouchableOpacity>} />
      </View>
      <Button onPress={handleCreate} title="Create Lobby" />
    </SafeAreaView>
  );
};

export default OnlineScreen;
