import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./WelcomeScreen";
import AchievementsScreen from "./AchievementScreen";
import DrawerContents from "../components/DrawerContent";
import Rules from "./RulesScreen";
import OnboardingScreen from "./onboardingScreen";

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={WelcomeScreen} />
      <Drawer.Screen name="Rules" component={Rules} />
    </Drawer.Navigator>
  );
}

export default MainDrawer;
