import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./WelcomeScreen";
import AchievementsScreen from "./AchievementScreen";
import DrawerContents from "../components/DrawerContent";
import Rules from "./RulesScreen";
import PrivacyPolicy from "./PrivacyPolicyScreen";

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={WelcomeScreen} />
      <Drawer.Screen name="Rules" component={Rules} />
      <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy} />
    </Drawer.Navigator>
  );
}

export default MainDrawer;
