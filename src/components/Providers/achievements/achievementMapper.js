import { getLongestPlayerHitStreak } from "../useStats";

const condition0 = ({ matchData }) => {
  if (matchData) {
    return { unlocked: true };
  }
  return null;
};

const condition1 = ({ matchData, userId }) => {
  const userTeam = matchData?.players.find(({ uid }) => uid === userId)?.team;

  if (userTeam !== matchData?.winningTeam) {
    return null;
  }
  const teamThrows = matchData?.data?.throws[userTeam];
  const opponentThrows = matchData?.data?.throws[userTeam === 0 ? 1 : 0];

  const team1CupIndex = opponentThrows.find(
    ({ state }) =>
      Object.values(state).filter(({ active }) => active).length === 1
  )?.actionIndex;
  const oppo5CupIndex = teamThrows.find(
    ({ state }) =>
      Object.values(state).filter(({ active }) => active).length === 5
  )?.actionIndex;

  if (team1CupIndex < 0 || oppo5CupIndex < 0) {
    return null;
  }
  if (team1CupIndex < oppo5CupIndex) {
    return { unlocked: true };
  }
  return null;
};

const condition2 = ({ matchData, userId }) => {
  const userTeam = matchData?.players.find(({ uid }) => uid === userId)?.team;
  const playerThrows = matchData?.data?.throws[userTeam]?.filter(
    ({ playerId }) => playerId === userId
  );
  const hitStreak = getLongestPlayerHitStreak(playerThrows);
  return { unlocked: hitStreak > 3 };
};

const condition3 = ({ matchData, userId }) => {
  if (matchData?.players?.length < 4) {
    return null;
  }
  const userTeam = matchData?.players.find(({ uid }) => uid === userId)?.team;
  const playerThrows = matchData?.data?.throws[userTeam]?.filter(
    ({ playerId }) => playerId === userId
  );
  const playerHits = playerThrows.filter(({ type }) => type === "HIT");

  return {
    unlocked: playerHits.length >= 8 && matchData?.winningTeam === userTeam
  };
};

const imageWelcome = require("../../../../assets/images/achievements/welcome.png");
const imageBell = require("../../../../assets/images/achievements/bell.png");
const imageCarry = require("../../../../assets/images/achievements/carry.png");
const imageFire = require("../../../../assets/images/achievements/fire.png");

export default [
  {
    id: 0,
    name: "Welcome to the Cup",
    description: "Play your first online match.",
    condition: condition0,
    image: imageWelcome
  },
  {
    id: 1,
    name: `I didn't hear no bell`,
    description:
      "Win a game after being down to 1 cup, while the opponents have 6 or more.",
    condition: condition1,
    image: imageBell
  },
  {
    id: 2,
    name: `On Fire`,
    description: "After being on fire, hit a cup with your extra throw.",
    condition: condition2,
    image: imageFire
  },
  {
    id: 3,
    name: `Carry the burden`,
    description:
      "Score at least 8 cups and win the game in a four player match.",
    condition: condition3,
    image: imageCarry
  }
];
