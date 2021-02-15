const getLobbyModel = (user) => ({
  host: {
    uid: user?.uid,
    name: user?.email,
  },
  players: {
    [user.uid]: { ready: false, name: user.email },
  },
});

export default getLobbyModel;
