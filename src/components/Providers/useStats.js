import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";

const initialStats = {
  matchCount: 0,
  matchWins: 0,
  matchLosses: 0,
  throwCount: 0,
  hitCount: 0,
  bestStreak: 0,
  streak: 0,
  bestHitStreak: 0
};

export const getLongestPlayerHitStreak = (throws) => {
  const normalizedArray = throws.map(({ type }) => type === "HIT");

  let longestStreak = 0;
  let currentStreak = 0;

  normalizedArray.forEach((hit) => {
    if (hit) {
      currentStreak += 1;
    } else {
      longestStreak = Math.max(currentStreak, longestStreak);
      currentStreak = 0;
    }
  });
  return Math.max(longestStreak, currentStreak);
};

const useStats = (userId, matchId) => {
  const [stats, setStats] = useState(undefined);
  const [recentMatches, setRecentMatches] = useState([]);
  const statsRef = firestore().collection("Stats").doc(userId);

  const fetchStats = () => {
    statsRef
      .get()
      .then((ref) => {
        if (ref.exists) {
          setStats(ref.data());
        } else {
          statsRef.set(initialStats).then(fetchStats).catch(console.log);
        }
      })
      .catch(console.log);
  };

  const fetchRecentMatches = (limit = 5) => {
    if (statsRef !== undefined) {
      const matchArray = [];
      statsRef
        .collection("MatchStats")
        .orderBy("timestamp", "desc")
        .limit(limit)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            matchArray.push(documentSnapshot.data());
          });
          setRecentMatches(matchArray);
        })
        .catch(console.log);
    }
  };

  const processMatch = async (matchData) => {
    const matchStatRef = statsRef.collection("MatchStats").doc(matchId);
    if (!matchStatRef.exists) {
      const playerTeam = matchData?.players.find(({ uid }) => uid === userId)
        ?.team;
      const win = matchData?.winningTeam === playerTeam;
      const teamThrows = matchData?.data?.throws[playerTeam];
      const playerThrows = teamThrows.filter(
        ({ playerId }) => playerId === userId
      );
      const playerHits = playerThrows.filter(({ type }) => type === "HIT");
      const winInc = win ? 1 : 0;
      const lossInc = win ? 0 : 1;

      const team0Throws = matchData?.data?.throws[0];
      const team0LastThrow = matchData?.data?.throws[0][team0Throws.length - 1];
      const team0RemainingCups = Object.values(team0LastThrow.state).filter(
        ({ active }) => active
      ).length;

      const team1Throws = matchData?.data?.throws[1];
      const team1LastThrow = matchData?.data?.throws[1][team1Throws.length - 1];
      const team1RemainingCups = Object.values(team1LastThrow.state).filter(
        ({ active }) => active
      ).length;

      const longestHitStreak = getLongestPlayerHitStreak(playerThrows);

      console.log(longestHitStreak);

      const {
        hitCount,
        matchCount,
        matchLosses,
        matchWins,
        throwCount,
        streak,
        bestStreak,
        bestHitStreak
      } = stats;

      const newStreak = win ? streak + 1 : 0;

      await statsRef.update({
        hitCount: hitCount + playerHits.length,
        matchCount: matchCount + 1,
        matchLosses: matchLosses + lossInc,
        matchWins: matchWins + winInc,
        throwCount: throwCount + playerThrows.length,
        streak: newStreak,
        bestStreak: Math.max(bestStreak, newStreak),
        bestHitStreak: Math.max(bestHitStreak, longestHitStreak)
      });
      await matchStatRef.set({
        playerThrows,
        win,
        playerTeam,
        remainingCups: {
          0: team0RemainingCups,
          1: team1RemainingCups
        },
        hitRate: playerHits.length / playerThrows.length,
        timestamp: firestore.FieldValue.serverTimestamp()
      });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, fetchStats, processMatch, recentMatches, fetchRecentMatches };
};

export default useStats;
