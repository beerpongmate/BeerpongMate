import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 24,
        top: 160,
        bottom: 160,
        left: 40,
        right: 40,
        backgroundColor: '#fff',
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

const WinnerOverlay = ({ winningTeam, players }) => {
    console.log("d");

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
        {renderWinner()}
      </View>
    )
};

export default WinnerOverlay;