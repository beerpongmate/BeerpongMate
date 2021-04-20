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
      return { nextPlayer: rebuttalPlayers[0] };
    }

    const determineOnFire = (playerToCheck) => {
      const playerThrows = teamThrows.filter(
        ({ playerId: id }) => playerToCheck === id
      );

      const lastThreeThrows = takeRight(playerThrows, 3);

      const filterHits = lastThreeThrows.filter(({ type }) => type === "HIT");

      if (filterHits.length === 3) {
        return playerToCheck;
      }
      return undefined;
    };

    const turnIndex = order.findIndex((id) => id === playerId);
    // 4 Player logic
    if (order.length === 4) {
      if (turnIndex === 1 || turnIndex === 3) {
        const prevPlayer = order[turnIndex - 1];
        // BALLS BACK LOGIC
        const [playerThrow] = takeRight(teamThrows, 1);
        const prevPlayerThrows = teamThrows.filter(
          ({ playerId }) => playerId === prevPlayer
        );
        const [prevPlayerThrow] = takeRight(prevPlayerThrows, 1);
        if (playerThrow.type === "HIT" && prevPlayerThrow.type === "HIT") {
          return { nextPlayer: prevPlayer };
        }
        // END OF BALLS BACK LOGIC
        // PrevPlayer on Fire
        const [lastThrow] = takeRight(teamThrows, 1);

        if (lastThrow?.type !== "HIT") {
          const prevPlayerOnFire = determineOnFire(prevPlayer);

          if (prevPlayerOnFire !== undefined) {
            const newOrder = order;
            newOrder[turnIndex] = prevPlayer;
            newOrder[turnIndex - 1] = playerId;

            return { newOrder, nextPlayer: prevPlayer };
          }
        }
        // End of PrevPlayer on Fire
      }
    }

    // END OF 4 Player logic

    // ON FIRE logic
    if (order.length === 2 || turnIndex === 1 || turnIndex === 3) {
      const playerOnFire = determineOnFire(playerId);
      if (playerOnFire !== undefined) {
        return { nextPlayer: playerOnFire };
      }
    }
    // END ON FIRE logic

    const currentIndex = order.findIndex((id) => id === playerId);
    if (order.length - 1 === currentIndex) {
      return { nextPlayer: order[0] };
    }
    return { nextPlayer: order[currentIndex + 1] };
  };

  const addThrow = (data) => {
    if (winningTeam === undefined) {
      const { data: matchData, players } = matchDataRef.current || {};
      const { order, throws, pendingWinner, actionIndex = 0 } = matchData || {};
      const player = players.find(({ uid }) => uid === user.uid);
      const { team } = player || {};
      throws[team] = [...(throws[team] || []), { ...data, actionIndex }];
      const opponentTeam = team === 0 ? 1 : 0;
      const opponentPlayers = players
        .filter(({ team }) => team === opponentTeam)
        .map(({ uid }) => uid);

      const isWinningThrow = data?.hitId === "1-1";

      // REBUTTAL LOGIC
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

      // END OF REBUTTAL LOGIC

      const { nextPlayer, newOrder } = getNextPlayerId(
        user.uid,
        order,
        throws[team],
        pendingEntry?.pendingWinner?.rebuttalPlayers
      );

      return matchRef.current.update({
        data: {
          throws,
          playerTurn: nextPlayer,
          order: newOrder || order,
          actionIndex: actionIndex + 1,
          ...pendingEntry
        }
      });
    }
  };

  const createMatch = (data) => firestore().collection("Matches").add(data);

  return { createMatch, match, addThrow };
};

export default useMatch;
