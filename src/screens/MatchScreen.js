import {
  SafeAreaView, StyleSheet, ScrollView, Text,
} from 'react-native';
import React, { useState, useRef } from 'react';
import TableContainer from '../components/TableContainer';
import MatchEventTypes from '../constants/MatchEventTypes';
import StatsContainer from '../components/StatsContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const MatchScreen = () => {
  const eventArray = useRef([]);
  const [throwCount, setThrowCount] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleHit = () => {
    setThrowCount(throwCount + 1);
    setHitCount(hitCount + 1);
    setStreak(streak + 1);
  };

  const handleMiss = () => {
    setThrowCount(throwCount + 1);
    setStreak(0);
  };

  const eventMap = {
    [MatchEventTypes.HIT]: handleHit,
    [MatchEventTypes.MISS]: handleMiss,
  };

  const logEvent = (event) => {
    eventArray.current.push(event);
    const eventFunction = eventMap[event.type];
    if (eventFunction !== undefined) {
      eventFunction();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TableContainer logEvent={logEvent} />
      <StatsContainer throwCount={throwCount} hitCount={hitCount} streak={streak} />
    </SafeAreaView>
  );
};

export default MatchScreen;
