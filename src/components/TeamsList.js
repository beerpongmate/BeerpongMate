import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import partition from 'lodash/partition';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    }
});

const renderItem = ({ item }) => (<Text>{item?.name}</Text>)

const TeamsList = ({ players }) => {
    const [team1, team2] = partition(players, ({ team }) => team === 0);

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text>Team 1</Text>
          <FlatList renderItem={renderItem} keyExtractor={({ uid }) => uid} data={team1} />
        </View>
        <View style={{ flex: 1 }}>
          <Text>Team 2</Text>
          <FlatList renderItem={renderItem} keyExtractor={({ uid }) => uid} data={team2} />
        </View>    
      </View>
    );
};

export default TeamsList;