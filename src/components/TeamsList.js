import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import partition from 'lodash/partition';
import ThemedText from './ThemedComponents/ThemedText';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    }
});

const renderItem = ({ item }) => (<ThemedText>{item?.name}</ThemedText>)

const TeamsList = ({ players }) => {
    const [team1, team2] = partition(players, ({ team }) => team === 0);

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ThemedText>Team 1</ThemedText>
          <FlatList renderItem={renderItem} keyExtractor={({ uid }) => uid} data={team1} />
        </View>
        <View style={{ flex: 1 }}>
          <ThemedText>Team 2</ThemedText>
          <FlatList renderItem={renderItem} keyExtractor={({ uid }) => uid} data={team2} />
        </View>    
      </View>
    );
};

export default TeamsList;