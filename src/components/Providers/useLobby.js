import firestore from "@react-native-firebase/firestore";
import React, { useRef, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useLobby = ({ lobbyId, userId }) => {
  const subscriber = useRef(() => {});
  const [lobbies, setLobbies] = useState([]);
  const [lobby, setLobby] = useState(null);
  const lobbyRef = useRef(null);

  const deleteLobby = () => firestore().collection("Lobbies").doc(lobbyId).delete();

  useFocusEffect(
    React.useCallback(() => {
      if (lobbyId !== undefined) {
        subscriber.current();
        subscriber.current = firestore()
          .collection("Lobbies")
          .doc(lobbyId)
          .onSnapshot(
            (documentSnapshot) => {
              setLobby(documentSnapshot.data());
              lobbyRef.current = documentSnapshot.data();
            },
            (error) => console.log(error)
          );
      } else {
        subscriber.current();
        subscriber.current = firestore()
          .collection("Lobbies")
          .onSnapshot(
            (querySnapshot) => {
              const lobbyArray = [];
              querySnapshot.forEach((snapLobby) => {
                lobbyArray.push({ id: snapLobby.id, ...snapLobby.data() });
              });
              setLobbies(lobbyArray);
            },
            (error) => console.log(error)
          );
      }

      // Stop listening for updates when no longer required
      return () => {
        subscriber.current();
      };
    }, [lobbyId, userId])
  );

  // leave lobby on unmount
  useEffect(() => () => { if (lobbyId) {
          if (lobbyRef.current?.host?.uid !== userId) {
            firestore()
              .collection("Lobbies")
              .doc(lobbyId)
              .update({ [`players.${userId}`]: firestore.FieldValue.delete() })
              .catch(() => {});
          }
        }} , [])

  const createLobby = (data) => firestore().collection("Lobbies").add(data);

  const joinLobby = (id, user) =>
    firestore()
      .collection("Lobbies")
      .doc(id)
      .update({ [`players.${user.uid}`]: { name: user.displayName, ready: false } });

  const startMatch = (id) =>
    firestore().collection("Lobbies").doc(lobbyId).update({ matchId: id });
  
  const readyUp = () =>
    firestore()
      .collection("Lobbies")
      .doc(lobbyId)
      .update({ [`players.${userId}.ready`]: true });

  return {
    createLobby,
    lobbies,
    lobby,
    joinLobby,
    readyUp,
    startMatch,
    deleteLobby
  };
};

export default useLobby;
