import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import cloneDeep from "lodash/cloneDeep";
import CupRowContainer from "./CupRowContainer";
import MatchEventTypes from "../constants/MatchEventTypes";
import theme from "../../assets/theme";
import PrimaryButton from "./Buttons/PrimaryButton";
import ThemedText from "./ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  container: {
  },
  primaryButton: {
    zIndex: 0
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: 0
  },
  buttonPadding: {
    paddingHorizontal: 35
  },
  playerName: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    height: 80,
    marginTop: 15,
    justifyContent: 'flex-end'
  }
});

const state10 = {
  "10-10": { active: true },
  "10-9": { active: true },
  "10-8": { active: true },
  "10-7": { active: true },
  "10-6": { active: true },
  "10-5": { active: true },
  "10-4": { active: true },
  "10-3": { active: true },
  "10-2": { active: true },
  "10-1": { active: true },
};

const state6 = {
  "6-6": { active: true },
  "6-5": { active: true },
  "6-4": { active: true },
  "6-3": { active: true },
  "6-2": { active: true },
  "6-1": { active: true },
};

const state3 = {
  "3-3": { active: true },
  "3-2": { active: true },
  "3-1": { active: true },
};

const state1 = {
  "1-1": { active: true },
};

const stateMap = {
  10: { state: state10, rows: 4 },
  6: { state: state6, rows: 3 },
  3: { state: state3, rows: 2 },
  1: { state: state1, rows: 1 },
};

const buildFormation = (state, rowCount) => {
  const rows = [];
  const stateKeys = Object.keys(state);
  const stateArray = stateKeys.map((key) => {
    const [formation, number] = key.split('-');
    return { id: key, ...state[key], number }
  });
  const orderedStateArray = stateArray.sort((first, second) => {
    if (first.number < second.number) {
      return -1;
    }
    if (first.number > second.number) {
      return 1;
    }
    return 0; // use lodash
  });

  let lowBound;
  let amount;
  for (
    lowBound = 0, amount = rowCount;
    lowBound < orderedStateArray.length;
    amount -= 1
  ) {
    rows.push(orderedStateArray.slice(lowBound, lowBound + amount));
    lowBound += amount;
  }

  return rows;
};

const CupContainer = ({
  handleEvent = () => {},
  onAnimation,
  currentPlayerId,
  skipPlayer,
  playerCount,
  showButtons = true,
  reversed = false,
  height,
  disablePress,
  style,
  matchId,
  cupFormation,
  isUsersTurn,
  currentPlayer,
  onCupContainerLayout = () => {}
}) => {
  const [cupSize, setCupSize] = useState(0);
  const cupState = useRef(cloneDeep(stateMap?.[10].state));
  const [containerHeight, setContainerHeight] = useState(0);
  const [rows, setRows] = useState(4);
  const [activeCups, setActiveCups] = useState(10);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const pendingCup = useRef(null);
  const [pendingReset, setPendingReset] = useState(false);

  useEffect(() => {
    const formationState = cloneDeep(stateMap[activeCups]);

    if (formationState) {
      const { state, rows: formationRows } = formationState;
      if (!cupFormation) {
        cupState.current = state;
      }
      setRows(formationRows);
      handleEvent({
        type: MatchEventTypes.ORDER,
        nextRowCount: formationRows,
        state: cupState.current,
      });
    }
  }, [activeCups]);

  useEffect(() => { 
    if (cupFormation) {
        cupState.current = cloneDeep(cupFormation);
        const newActiveCups = Object.values(cupFormation).filter(({ active }) => active).length
        setActiveCups(newActiveCups);
    }
  }, [cupFormation]);

  useEffect(() => {
    if (height) {
      setCupSize(height / 4);
    }
  }, [height]);

  const handleConfirm = (cupData) => { 
    setDisplayConfirm(true);
    pendingCup.current = cupData;
  }

  const handleUndo = () => { 
    setPendingReset(!pendingReset);
    setDisplayConfirm(false);
    pendingCup.current = null;
  }

  const handlePress = ({ id }) => {
    pendingCup.current = null;
    setDisplayConfirm(false);
    cupState.current[id].active = false;

    const eventActiveCups = Object.values(cupState.current).filter(({ active }) => active).length
    
    const formationState = cloneDeep(stateMap[eventActiveCups]);

    if (formationState) {
      const { state } = formationState;

      cupState.current = state;
    }

    handleEvent({
      type: MatchEventTypes.HIT,
      hitId: id,
      state: cupState.current,
      playerId: currentPlayerId,
    });
    setActiveCups(eventActiveCups);
  };

  const onLayout = ({
    nativeEvent: {
      layout: { width: layoutWidth },
    },
  }) => {
    if (!height && !reversed) {
      setCupSize(layoutWidth / 4);
    }
  };

  const onCupsLayout = ({
    nativeEvent: {
      layout: { height: layoutHeight },
    },
  }) => {
    setContainerHeight(layoutHeight);
    onCupContainerLayout(layoutHeight);
  };

  const renderCups = (formation) => formation.map((row) => (
    <CupRowContainer
      key={`itemCount${row.length}`}
      disablePress={disablePress || pendingCup.current !== null}
      onPress={handleConfirm}
      onAnimation={onAnimation}
      cupSize={cupSize}
      cupRow={row}
      resetPending={pendingReset}
    />
  ));

  const formation = buildFormation(cupState.current, rows);

  const sideBasedFormation = reversed ? formation.map(arr => arr.reverse()).reverse() : formation;
  
  return (
    <View onLayout={onLayout} style={[styles.container]}>
      <View
        onLayout={onCupsLayout}
        style={{
          minHeight: reversed ? height : containerHeight,
          zIndex: 10,
          ...style,
        }}
      >
        {renderCups(sideBasedFormation)}
      </View>
      <View style={styles.buttonContainer}>
        {displayConfirm && (
        <View style={styles.row}>
          <PrimaryButton 
            onPress={handleUndo} 
            label="CANCEL" 
            style={styles.primaryButton}
          />
          <PrimaryButton 
            onPress={() => { handlePress(pendingCup.current); setDisplayConfirm(false) }}
            label="HIT!"
            color={theme.colors.cupBlue}
            style={styles.primaryButton}
            containerStyle={styles.buttonPadding}
          />
        </View>
      )}
        {showButtons && (isUsersTurn || !matchId ) && !displayConfirm && (
        <View style={styles.row}>
          {(playerCount > 1 && !matchId) && (
            <PrimaryButton
              onPress={skipPlayer} 
              label="SKIP" 
              color={theme.colors.cupBlue}
              style={styles.primaryButton}
            />
          )}
          <PrimaryButton
            onPress={() =>
                handleEvent({
                  type: MatchEventTypes.MISS,
                  state: cupState.current,
                  playerId: currentPlayerId,
                })}
            label="MISS" 
            color={theme.colors.cupBlue}
            style={styles.primaryButton}
          />
        </View>
      )}
        {showButtons && matchId && !isUsersTurn && (<ThemedText style={styles.playerName}>{`${currentPlayer?.name}'s Turn`}</ThemedText>)}
      </View>
    </View>
  );
};

export default CupContainer;
