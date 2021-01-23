/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';

const App = () => {
  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
};

export default App;
