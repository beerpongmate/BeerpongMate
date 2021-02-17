import React from "react";
import { View, StyleSheet } from "react-native";
import CupContainer from "./CupContainer";
import theme from "../../assets/theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.tableInnerBorder,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.colors.table,
  },
  tableBorder: {
    margin: 15,
    marginBottom: 0,
    padding: 1,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: theme.colors.tableOuterBorder,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.colors.tableInnerBorder,
    zIndex: 5,
  },
});

const TableContainer = ({
  handleEvent,
  onAnimation,
  currentPlayerId,
  skipPlayer,
  playerCount,
  matchId,
  cupFormation,
  ...props
}) => (
  <View style={styles.tableBorder}>
    <View style={styles.container}>   
      <CupContainer
        handleEvent={handleEvent}
        onAnimation={onAnimation}
        currentPlayerId={currentPlayerId}
        skipPlayer={skipPlayer}
        playerCount={playerCount}
        matchId={matchId}
        cupFormation={cupFormation}
        {...props}
      />
    </View>
  </View>
  );

export default TableContainer;
