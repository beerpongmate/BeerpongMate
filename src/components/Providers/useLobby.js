import firestore from '@react-native-firebase/firestore';
import React, { useRef, useEffect, useState } from 'react';

const useLobby = (lobbyId) => {
  const subscriber = useRef(() => {});
  const [lobbies, setLobbies] = useState([]);
  const [lobby, setLobby] = useState(null);

  useEffect(() => {
    if (lobbyId !== undefined) {
      subscriber.current();
      subscriber.current = firestore()
        .collection('Lobbies')
        .doc(lobbyId)
        .onSnapshot((documentSnapshot) => {
          console.log('Lobby data: ', documentSnapshot.data);
          setLobby(documentSnapshot.data);
        }, (error) => console.log(error));
    } else {
      subscriber.current();
      subscriber.current = firestore()
        .collection('Lobbies')
        .onSnapshot((querySnapshot) => {
          const lobbyArray = [];
          console.log('Lobbies data: ', querySnapshot);
          querySnapshot.forEach((lobby) => { lobbyArray.push(lobby.data()); });
          setLobbies(lobbyArray);
        }, (error) => console.log(error));
    }

    // Stop listening for updates when no longer required
    return () => subscriber.current();
  }, [lobbyId]);

  const createLobby = (data) => firestore()
    .collection('Lobbies')
    .add(data);

  return { createLobby, lobbies, lobby };
};

export default useLobby;
