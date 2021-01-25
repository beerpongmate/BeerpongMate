import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import CupContainer from './CupContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#616163',
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#e71d36',
  },
});

const TableContainer = ({ logEvent }) => (
  <View style={styles.container}>
    <CupContainer logEvent={logEvent} />
  </View>
);

export default TableContainer;
