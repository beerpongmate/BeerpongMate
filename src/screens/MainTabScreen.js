import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import { StyleSheet, View } from 'react-native';
import AchievementsScreen from './AchievementScreen';
import MatchLandingScreen from './MatchLandingScreen';
import ThemedText from '../components/ThemedComponents/ThemedText';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center'
  }
});


function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Winner"
      tabBarOptions={{
        activeTintColor: 'black',
        showLabel: false,
        style: {
          height: 100
        }
      }}
    >
      <Tab.Screen
        name="Winner"
        component={MatchLandingScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabContainer}>
              <MaterialCommunityIcons
                name={focused ? "trophy" : "trophy-outline"}
                color="#1c52b0"
                size={40}
              />
              <ThemedText>Winner</ThemedText>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabContainer}>
              <MaterialCommunityIcons
                name={focused ? "arm-flex" : "arm-flex-outline"}
                color="#1c52b0"
                size={40}
              />
              <ThemedText>Achievements</ThemedText>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;