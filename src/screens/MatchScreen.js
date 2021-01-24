import { SafeAreaView, StyleSheet } from 'react-native';
import * as React from 'react';
import TableContainer from '../components/TableContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const MatchScreen = () => (
  <SafeAreaView style={styles.container}>
    <TableContainer />
  </SafeAreaView>
);

export default MatchScreen;
