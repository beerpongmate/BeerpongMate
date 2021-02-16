const getLobbyModel = (user) => ({
  host: {
    uid: user?.uid,
    name: user?.displayName,
  },
  players: {
    [user.uid]: { ready: false, name: user.displayName },
  },
});

export default getLobbyModel;
