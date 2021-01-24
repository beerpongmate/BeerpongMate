import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import CupRowContainer from './CupRowContainer';

const styles = StyleSheet.create({
  container: {
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

const CupContainer = ({ logEvent }) => {
  const [cupSize, setCupSize] = useState(0);
  const cupState = useRef(cloneDeep(stateMap?.[10].state));
  const [rows, setRows] = useState(4);
  const [activeCups, setActiveCups] = useState(10);

  useEffect(() => {
    const formationState = stateMap[activeCups];

    if (formationState) {
      const { state, rows: formationRows } = formationState;
      cupState.current = cloneDeep(state);
      setRows(formationRows);
      logEvent({ type: 'ORDER', nextRowCount: formationRows, state: cupState.current });
    }
  }, [activeCups]);

  const handlePress = ({ id }) => {
    cupState.current[id].active = false;
    logEvent({ type: 'HIT', hitId: id, state: cupState.current });
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

  const formation = buildFormation(cupState.current, rows);

  return (
    <View onLayout={onLayout} style={styles.container}>
      {formation.map((row) => <CupRowContainer key={`itemCount${row.length}`} onPress={handlePress} cupSize={cupSize} cupRow={row} />) }
      <Button onPress={() => logEvent({ type: 'MISS', state: cupState.current })} title="Miss" />
    </View>
  );
};

export default CupContainer;
