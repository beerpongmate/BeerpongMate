import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, Text, Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useLobby from '../components/Providers/useLobby';
import { useUser } from '../components/Providers/WithUser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
  },
  lobbyContainer: {

  },
});

const LobbyScreen = ({ route }) => {
  const { navigate, goBack } = useNavigation();
  const { lobbyId } = route.params;
  const { user } = useUser();
  const { lobby, readyUp } = useLobby({ lobbyId, userId: user.uid });
  const lobbyIsLoaded = useRef(false);

  const players = Object.keys(lobby?.players || {}).map((id) => ({ id, ...lobby.players[id] }));

  useEffect(() => {
    if (lobby) {
      lobbyIsLoaded.current = true;
    }

    if (!lobby && lobbyIsLoaded.current) {
      goBack();
    }
  }, [lobby]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={players} renderItem={({ item: { name, ready } }) => (<Text>{`${name} - ${ready ? 'Ready' : 'Not Ready'}`}</Text>)} />
      <Button onPress={readyUp} title="Ready" />
    </SafeAreaView>
  );
};

export default LobbyScreen;
