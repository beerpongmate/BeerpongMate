import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "../screens/WelcomeScreen";
import DrawerContents from "../components/DrawerContent";
import RulesScreen from "../screens/RulesScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={WelcomeScreen} />
      <Drawer.Screen name="Rules" component={RulesScreen} />
      <Drawer.Screen
        name="Onboarding"
        component={OnboardingScreen}
        initialParams={{ inDrawer: true }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawer;
