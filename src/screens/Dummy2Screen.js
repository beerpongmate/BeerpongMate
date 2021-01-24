import { SafeAreaView, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import CounterExample from './CounterExample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Dummy2Screen = () => (
  <SafeAreaView style={styles.container}>
    <CounterExample />
  </SafeAreaView>
);

export default Dummy2Screen;
