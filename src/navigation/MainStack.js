import React from 'react';
import DummyScreen from '../screens/DummyScreen';
import Dummy2Screen from '../screens/Dummy2Screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainStack = () => (
<Stack.Navigator initialRouteName="Dummy">
        <Stack.Screen name="Dummy" component={DummyScreen} />
        <Stack.Screen name="Dummy2" component={Dummy2Screen} />
      </Stack.Navigator>);

export default MainStack;