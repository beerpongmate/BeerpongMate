import wordlistAdj from "../../assets/wordlistAdj";
import wordlistNouns from "../../assets/wordlistNouns";

const generateInviteKey = () => {
  const indexAdj = Math.floor(Math.random() * wordlistAdj.length);
  const indexNouns = Math.floor(Math.random() * wordlistNouns.length);
  return `${wordlistAdj[indexAdj]}${wordlistNouns[indexNouns]}`;
};

const getLobbyModel = (user, playerCount, isPrivate) => ({
  host: {
    uid: user?.uid,
    name: user?.displayName
  },
  playerCount,
  players: {
    [user.uid]: { ready: false, name: user.displayName, team: 0 }
  },
  inviteKey: isPrivate ? generateInviteKey() : null
});

export default getLobbyModel;
