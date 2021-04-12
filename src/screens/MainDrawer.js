import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./WelcomeScreen";
import AchievementsScreen from "./AchievementScreen";
import DrawerContents from "../components/DrawerContent";


const Drawer = createDrawerNavigator();

function MainDrawer () {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={WelcomeScreen} />
      <Drawer.Screen name="Achievements" component={AchievementsScreen} />
    </Drawer.Navigator>
  );
}

export default MainDrawer;
