import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAchievements } from '../components/Providers/WithAchievements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const AchievementsScreen = () => {
    const { achievementData } = useAchievements();

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(achievementData, null, 2)}</Text>
      </View>
);
};

export default AchievementsScreen;