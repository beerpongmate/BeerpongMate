import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useStats from '../components/Providers/useStats';
import { useUser } from "../components/Providers/WithUser";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const StatsScreen = () => {
      const { user } = useUser();
    const { stats, fetchStats } = useStats(user.uid);

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(stats, null, 2)}</Text>
      </View>
);
};

export default StatsScreen;