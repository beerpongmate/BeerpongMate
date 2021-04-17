const getLobbyModel = (user, playerCount) => ({
  host: {
    uid: user?.uid,
    name: user?.displayName,
  },
  playerCount,
  players: {
    [user.uid]: { ready: false, name: user.displayName, team: 0 },
  },
});

export default getLobbyModel;
