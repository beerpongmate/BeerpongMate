import {
  SafeAreaView, StyleSheet, View,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import TableContainer from '../components/TableContainer';
import MatchEventTypes from '../constants/MatchEventTypes';
import StatsContainer from '../components/StatsContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  interactionBlock: {
    zIndex: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});

const initialStats = {
  hitCount: 0,
  throwCount: 0,
  streak: 0,
};

const defaultPlayers = [
  {
    name: 'Harold',
    uid: '000',
  },
  {
    name: 'Kumar',
    uid: '001',
  },
];

const MatchScreen = ({ route }) => {
  const eventArray = useRef([]);
  const stats = useRef({});
  const [isAnimating, setAnimating] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(undefined);
  const [round, setRound] = useState(0);

  const { players = defaultPlayers, online = false } = route?.params || {};

  useEffect(() => {
    players.forEach(({ uid, ...playerData }) => {
      stats.current[uid] = {
        ...playerData,
        throwCount: 0,
        hitCount: 0,
        streak: 0,
      };
    });
    setPlayerIndex(0);
  }, []);

  const nextPlayer = () => {
    if (playerIndex === players.length - 1) {
      setPlayerIndex(0);
      setRound(round + 1);
    } else {
      setPlayerIndex(playerIndex + 1);
    }
  };

  const setThrowCount = (throws, playerId) => {
    console.log(playerId);
    stats.current[playerId].throwCount = throws;
  };

  const setHitCount = (hits, playerId) => {
    stats.current[playerId].hitCount = hits;
  };

  const setStreak = (streak, playerId) => {
    stats.current[playerId].streak = streak;
  };

  const handleHit = (playerId) => {
    setThrowCount(stats.current[playerId].throwCount + 1, playerId);
    setHitCount(stats.current[playerId].hitCount + 1, playerId);
    setStreak(stats.current[playerId].streak + 1, playerId);
    nextPlayer();
  };

  const handleMiss = (playerId) => {
    setThrowCount(stats.current[playerId].throwCount + 1, playerId);
    setStreak(0, playerId);
    nextPlayer();
  };

  const eventMap = {
    [MatchEventTypes.HIT]: handleHit,
    [MatchEventTypes.MISS]: handleMiss,
  };

  const handleEvent = (event) => {
    eventArray.current.push(event);
    const eventFunction = eventMap[event?.type];
    if (eventFunction !== undefined) {
      eventFunction(event?.playerId);
    }
  };

  const handleAnimation = (animating) => {
    setAnimating(animating);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TableContainer
        handleEvent={handleEvent}
        onAnimation={handleAnimation}
        currentPlayerId={players[playerIndex]?.uid}
        skipPlayer={nextPlayer}
        playerCount={players.length}
      />
      {!online
      && (<StatsContainer stats={stats.current} playerId={players[playerIndex]?.uid} round={round} />)}
      {isAnimating && <View style={styles.interactionBlock} />}
    </SafeAreaView>
  );
};

export default MatchScreen;
