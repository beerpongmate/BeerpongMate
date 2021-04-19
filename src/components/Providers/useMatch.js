import firestore from "@react-native-firebase/firestore";
import React, { useRef, useState } from "react";
import takeRight from "lodash/takeRight";
import { useFocusEffect } from "@react-navigation/native";

const useMatch = (matchId, user) => {
  const subscriber = useRef(() => {});
  const [match, setMatch] = useState(null);
  const matchDataRef = useRef(null);
  const matchRef = useRef(null);

  const { winningTeam } = match || {};

  const setWinningTeam = (team) =>
    matchRef.current.update({
      winningTeam: team
    });

  if (winningTeam === undefined) {
    const { pendingWinner } = match?.data || {};
    const { team, rebuttalPlayers } = pendingWinner || {};
    const team0Throws = match?.data?.throws[0] || [];
    console.log("TEAM0Throws:", team0Throws);
    console.log("TEAM0ThrowCount:", team0Throws.length);

    const team0WinIndex = team0Throws.findIndex(({ hitId }) => hitId === "1-1");
    console.log("TEAM0WIN:", team0WinIndex);
    const team1Throws = match?.data?.throws[1] || [];
    console.log("TEAM1Throws:", team1Throws);
    console.log("TEAM1ThrowCount:", team1Throws.length);

    const team1WinIndex = team1Throws.findIndex(({ hitId }) => hitId === "1-1");
    console.log("TEAM1WIN:", team1WinIndex);

    if (team1WinIndex > 0 && team0WinIndex > 0) {
      setWinningTeam(-1);
    } else if (team === 1 && rebuttalPlayers.length === 0) {
      setWinningTeam(1);
    } else if (team === 0 && rebuttalPlayers.length === 0) {
      setWinningTeam(0);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (matchId) {
        matchRef.current = firestore().collection("Matches").doc(matchId);
        subscriber.current = matchRef.current.onSnapshot(
          (documentSnapshot) => {
            setMatch(documentSnapshot.data());
            matchDataRef.current = documentSnapshot.data();
          },
          (error) => console.log(error)
        );
      }

      // Stop listening for updates when no longer required
      return () => {
        subscriber.current();
      };
    }, [matchId])
  );

  const getNextPlayerId = (playerId, order, teamThrows, rebuttalPlayers) => {
    if (rebuttalPlayers && rebuttalPlayers.length > 0) {
      return rebuttalPlayers[0];
    }

    // ON FIRE logic
    const playerThrows = teamThrows.filter(
      ({ playerId: id }) => playerId === id
    );

    const lastThreeThrows = takeRight(playerThrows, 3);

    const filterHits = lastThreeThrows.filter(({ type }) => type === "HIT");

    if (filterHits.length === 3) {
      return playerId;
    }
    // END ON FIRE logic

    const currentIndex = order.findIndex((id) => id === playerId);
    if (order.length - 1 === currentIndex) {
      return order[0];
    }
    return order[currentIndex + 1];
  };

  const addThrow = (data) => {
    if (winningTeam === undefined) {
      const { data: matchData, players } = matchDataRef.current || {};
      const { order, throws, pendingWinner } = matchData || {};
      const player = players.find(({ uid }) => uid === user.uid);
      const { team } = player || {};
      throws[team] = [...(throws[team] || []), data];
      const opponentTeam = team === 0 ? 1 : 0;
      const opponentPlayers = players
        .filter(({ team }) => team === opponentTeam)
        .map(({ uid }) => uid);

      const isWinningThrow = data?.hitId === "1-1";

      let pendingEntry;

      if (isWinningThrow) {
        pendingEntry = {
          pendingWinner: {
            team,
            rebuttalPlayers: opponentPlayers
          }
        };
      } else if (pendingWinner?.rebuttalPlayers?.length > 0) {
        if (data?.type === "HIT") {
          pendingEntry = { pendingWinner };
        } else {
          pendingEntry = {
            pendingWinner: {
              ...pendingWinner,
              rebuttalPlayers: pendingWinner?.rebuttalPlayers.filter(
                (uid) => uid !== user.uid
              )
            }
          };
        }
      }

      return matchRef.current.update({
        data: {
          throws,
          playerTurn: getNextPlayerId(
            user.uid,
            order,
            throws[team],
            pendingEntry?.pendingWinner?.rebuttalPlayers
          ),
          order,
          ...pendingEntry
        }
      });
    }
  };

  const createMatch = (data) => firestore().collection("Matches").add(data);

  return { createMatch, match, addThrow };
};

export default useMatch;
