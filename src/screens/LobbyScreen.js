import React from 'react';
import {
  View, SafeAreaView, FlatList, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
  },
  lobbyContainer: {

  },
});

const LobbyScreen = () => {
  console.log('gi');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lobbyContainer}>
        <FlatList renderItem={(data) => { <Text>{data.host.name}</Text>; }} />
      </View>
      <Button onPress={() => navigate('Lobby')} title="Online Match" />
    </SafeAreaView>
  );
};

export default LobbyScreen;
