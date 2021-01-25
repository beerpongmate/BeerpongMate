import React from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import theme from '../../assets/theme';
import StatItem from './StatItem';

const styles = StyleSheet.create({
  counter: {
    textAlign: 'center',
  },
  tableBorder: {
    flex: 1,
    margin: 15,
    marginTop: 1,
    borderColor: theme.tableOuterBorder,
    borderWidth: 5,
    borderTopWidth: 3,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 1,
  },
  table: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.tableInnerBorder,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: theme.table,
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
});

const StatsContainer = ({ throwCount, hitCount, streak }) => (
  <View style={styles.tableBorder}>
    <View style={styles.table}>
      <ScrollView>
        <View style={styles.row}>
          <StatItem stat={throwCount} iconName="circle" label="Throws" />
          <StatItem stat={hitCount} iconName="cup" label="Hits" />
        </View>
        <View style={styles.row}>
          <StatItem stat={streak} iconName="fire" label="Streak" />
        </View>
      </ScrollView>
    </View>
  </View>
);

export default StatsContainer;
