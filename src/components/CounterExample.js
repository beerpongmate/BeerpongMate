import React, { useState } from 'react';
import {
  View, Button, Text, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  counter: {
    textAlign: 'center',
  },
});

const CounterExample = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View>
      <Button onPress={() => setCounter(counter - 1)} title="Decrease" />
      <Text style={styles.counter}>{counter}</Text>
      <Button onPress={() => setCounter(counter + 1)} title="Increase" />
    </View>
  );
};

export default CounterExample;
