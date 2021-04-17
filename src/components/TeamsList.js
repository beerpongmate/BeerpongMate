import React from "react";
import { View, StyleSheet } from "react-native";
import { isUndefined } from "lodash";
import ThemedText from "./ThemedComponents/ThemedText";
import PlayerItem from "./PlayerItem";
import theme from "../../assets/theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  text: {
    fontSize: 24
  }
});

const TeamsList = ({ playerCount = 2, players, team }) => {
  const slots = new Array(playerCount).fill("EMPTY");
  const teamPlayers = players.filter(
    ({ team: playerTeam }) => team === playerTeam
  );

  teamPlayers.forEach((item, index) => {
    slots[index] = item;
  });

  return (
    <View style={styles.container}>
      {slots.map((item, index) => {
        if (item === "EMPTY") {
          return (
            <ThemedText
              key={`${index}EMTPY`}
              style={[
                styles.text,
                {
                  color: team === 0 ? theme.colors.cupBlue : theme.colors.cupRed
                }
              ]}
            >
              Empty
            </ThemedText>
          );
        }
        return (
          <PlayerItem
            name={item?.name}
            ready={item?.ready}
            key={item?.uid}
            team={item?.team}
          />
        );
      })}
    </View>
  );
};

export default TeamsList;
