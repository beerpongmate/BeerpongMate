const getLobbyModel = (user) => ({
  host: {
    uid: user?.uid,
    name: user?.displayName,
  },
  players: {
    [user.uid]: { ready: false, name: user.displayName, team: 0 },
  },
});

export default getLobbyModel;
