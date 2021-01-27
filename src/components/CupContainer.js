import React, { useRef, useState, useEffect } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import CupRowContainer from './CupRowContainer';
import MatchEventTypes from '../constants/MatchEventTypes';

const styles = StyleSheet.create({
  container: {
  },
  missButton: {
    marginTop: 40,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#fff',
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
  buttonLabel: {
    textDecorationLine: 'underline',
    fontSize: 24,
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const state10 = {
  '10-10': { active: true },
  '10-9': { active: true },
  '10-8': { active: true },
  '10-7': { active: true },
  '10-6': { active: true },
  '10-5': { active: true },
  '10-4': { active: true },
  '10-3': { active: true },
  '10-2': { active: true },
  '10-1': { active: true },
};

const state6 = {
  '6-6': { active: true },
  '6-5': { active: true },
  '6-4': { active: true },
  '6-3': { active: true },
  '6-2': { active: true },
  '6-1': { active: true },
};

const state3 = {
  '3-3': { active: true },
  '3-2': { active: true },
  '3-1': { active: true },
};

const state1 = {
  '1-1': { active: true },
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
  const stateArray = stateKeys.map((key) => ({ id: key, ...state[key] }));

  let lowBound;
  let amount;
  for (lowBound = 0, amount = rowCount; lowBound < stateArray.length; amount -= 1) {
    rows.push(stateArray.slice(lowBound, lowBound + amount));
    lowBound += amount;
  }

  return rows;
};

const CupContainer = ({
  handleEvent, onAnimation, currentPlayerId, skipPlayer, playerCount,
}) => {
  const [cupSize, setCupSize] = useState(0);
  const cupState = useRef(cloneDeep(stateMap?.[10].state));
  const containerHeight = useRef(0);
  const [rows, setRows] = useState(4);
  const [activeCups, setActiveCups] = useState(10);

  useEffect(() => {
    const formationState = stateMap[activeCups];

    if (formationState) {
      const { state, rows: formationRows } = formationState;
      cupState.current = cloneDeep(state);
      setRows(formationRows);
      handleEvent(
        {
          type: MatchEventTypes.ORDER,
          nextRowCount: formationRows,
          state: cupState.current,
        },
      );
    }
  }, [activeCups]);

  const handlePress = ({ id }) => {
    cupState.current[id].active = false;
    handleEvent(
      {
        type: MatchEventTypes.HIT,
        hitId: id,
        state: cupState.current,
        playerId: currentPlayerId,
      },
    );
    setActiveCups(activeCups - 1);
  };

  const onLayout = ({
    nativeEvent: {
      layout: {
        width: layoutWidth,
      },
    },
  }) => {
    setCupSize(layoutWidth / 4);
  };

  const onCupsLayout = ({
    nativeEvent: {
      layout: {
        height: layoutHeight,
      },
    },
  }) => {
    containerHeight.current = layoutHeight;
  };

  const formation = buildFormation(cupState.current, rows);

  return (
    <View onLayout={onLayout} style={[styles.container]}>
      <View onLayout={onCupsLayout} style={{ minHeight: containerHeight.current, zIndex: 10 }}>
        {formation.map((row) => <CupRowContainer key={`itemCount${row.length}`} onPress={handlePress} onAnimation={onAnimation} cupSize={cupSize} cupRow={row} />) }
      </View>
      <View style={styles.row}>
        {playerCount > 1 && (
        <TouchableOpacity
          style={styles.missButton}
          onPress={skipPlayer}
        >
          <Text style={styles.buttonLabel}>SKIP</Text>
        </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.missButton}
          onPress={
          () => handleEvent(
            {
              type: MatchEventTypes.MISS,
              state: cupState.current,
              playerId: currentPlayerId,
            },
          )
        }
        >
          <Text style={styles.buttonLabel}>MISS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CupContainer;
