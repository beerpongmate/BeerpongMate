import firestore from "@react-native-firebase/firestore";
import React, { useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useMatch = (matchId, user) => {
  const subscriber = useRef(() => {});
  const [match, setMatch] = useState(null);
  const matchDataRef = useRef(null);
  const matchRef = useRef(null);

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
    console.log(match);
    const { data: matchData, players} = matchDataRef.current || {};
    const { order, throws } = matchData || {};
    console.log(players);
    console.log(user);
    const player = players.find(({ uid }) => uid === user.uid)
    console.log(player);
    const { team } = player || {};
    throws[team] = [...throws[team], data];
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
