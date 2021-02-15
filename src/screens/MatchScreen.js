import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import TableContainer from "../components/TableContainer";
import MatchEventTypes from "../constants/MatchEventTypes";
import StatsContainer from "../components/StatsContainer";
import { useUser } from "../components/Providers/WithUser";
import useMatch from "../components/Providers/useMatch";
import CupContainer from "../components/CupContainer";
import theme from "../../assets/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  interactionBlock: {
    zIndex: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  tableContainer: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.tableInnerBorder,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: theme.colors.table,
    flex: 1,
  },
  tableBorder: {
    margin: 15,
    marginTop: 0,
    padding: 1,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: theme.colors.tableOuterBorder,
    borderBottomWidth: 3,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: theme.colors.tableInnerBorder,
    flex: 1,
  },
  tableSpacer: {
    alignContent: "flex-end",
    flex: 1,
  },
  fill: {
    flex: 1,
  },
});

const initialStats = {
  hitCount: 0,
  throwCount: 0,
  streak: 0,
};

const defaultPlayers = [
  {
    name: "Harold",
    uid: "000",
  },
  {
    name: "Kumar",
    uid: "001",
  },
];

const MatchScreen = ({ route }) => {
  const eventArray = useRef([]);
  const stats = useRef({});
  const [isAnimating, setAnimating] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(undefined);
  const [round, setRound] = useState(0);
  const { user } = useUser();
  const { matchId } = route?.params || {};
  const { match, addThrow } = useMatch(matchId, user);
  const [lowerContainerHeight, setLowerContainerHeight] = useState(null);
  const { players } = match || { players: defaultPlayers };
  const currentPlayer = match?.data?.playerTurn;
  const playerTurn = currentPlayer === user.uid;
  const player = (match?.players || []).find(({ uid }) => uid === user.uid);
  const team = player?.team;
  const throws = match?.data?.throws[team] || [];
  const lastThrow = throws.length > 0 ? throws[throws.length - 1] : undefined;
  const cups = lastThrow?.state;
  const opponentTeam = team === 0 ? 1 : 0;
  const opponentThrows = match?.data?.throws[opponentTeam] || [];
  const opponenLastThrow = opponentThrows.length > 0 ? opponentThrows[opponentThrows.length - 1] : undefined;
  const opponentCups = opponenLastThrow?.state;

  console.log(match);
  console.log(matchId);

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
  }, [players]);

  const nextPlayer = () => {
    if (playerIndex === players.length - 1) {
      setPlayerIndex(0);
      setRound(round + 1);
    } else {
      setPlayerIndex(playerIndex + 1);
    }
  };

  const setThrowCount = (throws, playerId) => {
    stats.current[playerId].throwCount = throws;
  };

  const setHitCount = (hits, playerId) => {
    stats.current[playerId].hitCount = hits;
  };

  const setStreak = (streak, playerId) => {
    stats.current[playerId].streak = streak;
  };

  const handleHit = (playerId, event) => {
    setThrowCount(stats.current[playerId].throwCount + 1, playerId);
    setHitCount(stats.current[playerId].hitCount + 1, playerId);
    setStreak(stats.current[playerId].streak + 1, playerId);
    if (!matchId) {
      nextPlayer();
    } else {
        addThrow(event);
    }
  };

  const handleMiss = (playerId, event) => {
    setThrowCount(stats.current[playerId].throwCount + 1, playerId);
    setStreak(0, playerId);
    if (!matchId) {
      nextPlayer();
    } else {
      addThrow(event)
    }
  };

  const eventMap = {
    [MatchEventTypes.HIT]: handleHit,
    [MatchEventTypes.MISS]: handleMiss,
  };

  const handleEvent = (event) => {
    eventArray.current.push(event);
    const eventFunction = eventMap[event?.type];
    if (eventFunction !== undefined) {
      eventFunction(event?.playerId, event);
    }
  };

  const handleAnimation = (animating) => {
    setAnimating(animating);
  };

  const onLowerTableLayout = ({
    nativeEvent: {
      layout: { height: layoutHeight },
    },
  }) => {
    setLowerContainerHeight(layoutHeight);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TableContainer
        handleEvent={handleEvent}
        onAnimation={handleAnimation}
        currentPlayerId={currentPlayer || players[playerIndex]?.uid}
        skipPlayer={nextPlayer}
        playerCount={players.length}
        matchId={matchId}
        cupFormation={cups}
      />
      {matchId ? (
        <View style={styles.tableBorder}>
          <View style={styles.tableContainer}>
            <View style={styles.tableSpacer}>
              <Text style={styles.playerName}>
                {(stats.current[currentPlayer] || {}).name}
              </Text>

              <View
                style={[styles.row, styles.fill]}
                onLayout={onLowerTableLayout}
              >
                <CupContainer
                  cupFormation={opponentCups}
                  style={{ justifyContent: "flex-end" }}
                  showButtons={false}
                  reversed
                  disablePress
                  onAnimation={handleAnimation}
                  height={lowerContainerHeight}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <StatsContainer
          stats={stats.current}
          playerId={players[playerIndex]?.uid}
          round={round}
        />
      )}
      {(isAnimating || (!playerTurn && matchId )) && <View style={styles.interactionBlock} />}
    </SafeAreaView>
  );
};

export default MatchScreen;
