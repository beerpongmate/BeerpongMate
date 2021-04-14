import React, { useEffect } from "react";

import { View, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import theme from "../../assets/theme";
import useStats from "../components/Providers/useStats";
import { useUser } from "../components/Providers/WithUser";
import StatsChart from "../components/StatsChart";
import StatItem from "../components/StatItem";
import ThemedText from "../components/ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 5
  },
  spacer: {
    height: 4,
    width: "100%",
    backgroundColor: theme.colors.cupBlue
  },
  segment: {
    marginBottom: 30
  },
  chart: {
    marginTop: 20
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
  } = stats || {};

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatsChart style={styles.chart} matchData={recentMatches} />
        <View style={styles.innerContainer}>
          <View style={styles.segment}>
            <View style={styles.row}>
              <StatItem
                stat={
                  matchWins > 0 && matchCount > 0
                    ? ((matchWins / matchCount) * 100).toFixed(2)
                    : "0"
                }
                label="Win %"
                iconName="trophy-outline"
                color={theme.colors.cupBlue}
                labelColor="black"
              />
            </View>
            <View style={styles.row}>
              <StatItem
                stat={matchCount}
                label="Matches Played"
                color={theme.colors.cupBlue}
                labelColor="black"
              />
              <StatItem
                stat={matchWins}
                label="Matches Won"
                color={theme.colors.cupBlue}
                labelColor="black"
              />
            </View>
          </View>
          <View style={styles.segment}>
            <View style={styles.row}>
              <StatItem
                stat={
                  hitCount > 0 && throwCount > 0
                    ? ((hitCount / throwCount) * 100).toFixed(2)
                    : "0"
                }
                label="Hit %"
                iconName="cup"
                color={theme.colors.cupRed}
                labelColor="black"
              />
            </View>
            <View style={styles.row}>
              <StatItem
                stat={throwCount}
                label="Throws"
                color={theme.colors.cupRed}
                labelColor="black"
              />
              <StatItem
                stat={hitCount}
                label="Hits"
                color={theme.colors.cupRed}
                labelColor="black"
              />
            </View>
          </View>
          <View style={styles.segment}>
            <View style={styles.row}>
              <StatItem
                stat={bestHitStreak}
                label="Best Hit Streak"
                iconName="arm-flex-outline"
                color={theme.colors.cupBlue}
                labelColor="black"
              />
            </View>
            <View style={styles.row}>
              <StatItem
                stat={streak}
                label="Current Win Streak"
                color={theme.colors.cupBlue}
                labelColor="black"
              />
              <StatItem
                stat={bestStreak}
                label="Best Win Streak"
                color={theme.colors.cupBlue}
                labelColor="black"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsScreen;
