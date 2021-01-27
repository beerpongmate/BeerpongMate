import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MatchScreen from '../screens/MatchScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import OnlineScreen from '../screens/OnlineScreen';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="Online" component={OnlineScreen} />
    <Stack.Screen name="Match" component={MatchScreen} />
  </Stack.Navigator>
);

export default MainStack;
