import {
  SafeAreaView, Text, StyleSheet, Button,
} from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  helloWorld: {
    textAlign: 'center',
  },
});

const DummyScreen = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.helloWorld}>Hello world</Text>
      <Button onPress={() => navigate('Dummy2')} title="Navigate" />
    </SafeAreaView>
  );
};

export default DummyScreen;
