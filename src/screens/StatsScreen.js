import React from 'react';
import { View, StyleSheet } from 'react-native';
import useStats from '../components/Providers/useStats';
import { useUser } from "../components/Providers/WithUser";
import ThemedText from '../components/ThemedComponents/ThemedText';

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
        <ThemedText>{JSON.stringify(stats, null, 2)}</ThemedText>
      </View>
);
};

export default StatsScreen;