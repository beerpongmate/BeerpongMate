import React, { useEffect } from "react";

import { View, StyleSheet } from "react-native";
import useStats from "../components/Providers/useStats";
import { useUser } from "../components/Providers/WithUser";
import StatItem from "../components/StatItem";
import ThemedText from "../components/ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15
  }
});

const StatsScreen = () => {
  const { user } = useUser();
  const { stats, fetchStats, recentMatches, fetchRecentMatches } = useStats(
    user.uid
  );

  useEffect(() => {
    fetchRecentMatches();
  }, []);

  const {
    bestStreak,
    bestHitStreak,
    matchCount,
    hitCount,
    matchLosses,
    throwCount,
    matchWins,
    streak
  } = stats;

  return (
    <View style={styles.container}>
      <StatItem stat={matchCount} label="Matches Played" />
      <ThemedText>{JSON.stringify(stats, null, 2)}</ThemedText>
      <ThemedText>{JSON.stringify(recentMatches, null, 2)}</ThemedText>
    </View>
  );
};

export default StatsScreen;
