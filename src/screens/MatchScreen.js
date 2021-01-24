import { SafeAreaView, StyleSheet, ScrollView, Text } from 'react-native';
import React, { useState } from 'react';
import TableContainer from '../components/TableContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const MatchScreen = () => {
  const [log, setLog] = useState('---MATCH START----\n');

  const logEvent = (event) => {
    setLog(`${log}\n${JSON.stringify(event, null, 2)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TableContainer logEvent={logEvent} />
      <ScrollView style={{ flex: 1 }}>
        <Text>{log}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatchScreen;
