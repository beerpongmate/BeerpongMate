import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import CupContainer from './CupContainer';
import theme from '../../assets/theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.tableInnerBorder,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.table,
  },
  tableBorder: {
    margin: 15,
    marginBottom: 0,
    padding: 1,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: theme.tableOuterBorder,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.tableInnerBorder,
    zIndex: 5,
  },
});

const TableContainer = ({ logEvent }) => (
  <View style={styles.tableBorder}>
    <View style={styles.container}>
      <CupContainer logEvent={logEvent} />
    </View>
  </View>
);

export default TableContainer;
