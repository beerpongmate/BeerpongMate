import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import WelcomeScreen from './WelcomeScreen';
import AchievementsScreen from './AchievementScreen';
import OnlineScreen from './OnlineScreen';
import MatchLandingScreen from './MatchLandingScreen';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Online"
      tabBarOptions={{
        activeTintColor: 'black',
      }}
    >
      
      <Tab.Screen
        name="Winner"
        component={MatchLandingScreen}
        options={{
          fontSize: 40,
          tabBarLabel: 'Winner',
          labelStyle: {
            fontSize: 30,
          }, 
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" color={'#1c52b0'} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          tabBarLabel: 'Achievements',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="arm-flex" color={'#1c52b0'} size={40} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;