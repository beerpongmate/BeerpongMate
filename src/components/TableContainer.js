import React, { useState } from 'react';
import {
  View, StyleSheet, Text, ScrollView,
} from 'react-native';
import CupContainer from './CupContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,

  },
});

const TableContainer = () => {
  const [log, setLog] = useState('---MATCH START----\n');

  const logEvent = (event) => {
    setLog(`${log}\n${JSON.stringify(event, null, 2)}`);
  };

  return (
    <View style={styles.container}>
      <CupContainer logEvent={logEvent} />
      <ScrollView style={{ flex: 1 }}>
        <Text>{log}</Text>
      </ScrollView>
    </View>
  );
};

export default TableContainer;
