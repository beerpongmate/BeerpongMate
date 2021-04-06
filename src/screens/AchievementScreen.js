import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAchievements } from '../components/Providers/WithAchievements';
import ThemedText from '../components/ThemedComponents/ThemedText';

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
        <ThemedText>{JSON.stringify(achievementData, null, 2)}</ThemedText>
      </View>
);
};

export default AchievementsScreen;