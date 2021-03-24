import firestore from "@react-native-firebase/firestore";
import React, { useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useMatch = (matchId, user) => {
  const subscriber = useRef(() => {});
  const [match, setMatch] = useState(null);
  const matchDataRef = useRef(null);
  const matchRef = useRef(null);

  const { winningTeam } = match || {};

  const setWinningTeam = (team) => matchRef.current.update({
      winningTeam: team
    });

  if (winningTeam === undefined) {
    const team0Throws = match?.data?.throws[0] || [];
    const team0WinIndex = team0Throws.findIndex(({ hitId }) => hitId === '1-1');
    const team1Throws = match?.data?.throws[1] || [];
    const team1WinIndex = team1Throws.findIndex(({ hitId }) => hitId === '1-1');

    if (team1WinIndex > 0 && team1WinIndex > 0 && team0WinIndex === team1WinIndex) {
      setWinningTeam(-1);
    } else if (team1WinIndex > 0 && team1WinIndex <= team0Throws.length - 1) {
      setWinningTeam(1);
    } else if (team0WinIndex > 0 && team0WinIndex <= team1Throws.length-1) {
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

  const getNextPlayerId = (playerId, order) => {
    const currentIndex = order.findIndex((id) => id === playerId);
    if (order.length - 1 === currentIndex) {
      return order[0];
    }
    return order[currentIndex + 1];
  };

  const addThrow = (data) => {
    const { data: matchData, players} = matchDataRef.current || {};
    const { order, throws } = matchData || {};
    const player = players.find(({ uid }) => uid === user.uid)
    const { team } = player || {};
    throws[team] = [...(throws[team] || []) , data];
    return matchRef.current.update({
      data: {
        throws,
        playerTurn: getNextPlayerId(user.uid, order),
        order,
      },
    });
  };

  const createMatch = (data) => firestore().collection("Matches").add(data);

  return { createMatch, match, addThrow };
};

export default useMatch;
