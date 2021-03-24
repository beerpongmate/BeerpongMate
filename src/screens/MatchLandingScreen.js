import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../components/Providers/WithUser";
import useLobby from "../components/Providers/useLobby";

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
    title: {
        color: 'black',
        textAlign: 'center',
        fontSize: 24
    },
    player: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    }
});

const MatchLandingScreen = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { matchData: { winningTeam, players }, lobbyId } = params;
  const { user } = useUser();
  const { lobby, deleteLobby } = useLobby({
    lobbyId,
    userId: user.uid,
  });

  const handleContinue = () => {
    if (lobby?.host?.uid === user.uid) {
      deleteLobby().finally(() => navigate('Welcome'));
    } else {
      navigate('Welcome');
    }
    
  };

    const renderWinner = () => {
        if (winningTeam === -1) {
            return <Text style={styles.title}>Draw</Text>
        }
    
        return (
          <>
            <Text style={styles.title}>Congratulations</Text>
            {players.filter(({ team }) => team === winningTeam).map(({ name }) => <Text style={styles.player}>{name}</Text>)} 
          </>
        );
        
     }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {renderWinner()}
        </View>
        <Button onPress={handleContinue} title="CONTINUE" />
      </View>
    )
};

export default MatchLandingScreen;