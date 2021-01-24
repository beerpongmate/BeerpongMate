import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DummyScreen from '../screens/DummyScreen';
import MatchScreen from '../screens/MatchScreen';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Dummy">
    <Stack.Screen name="Dummy" component={DummyScreen} />
    <Stack.Screen name="Match" component={MatchScreen} />
  </Stack.Navigator>
);

export default MainStack;
