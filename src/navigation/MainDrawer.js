import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "../screens/WelcomeScreen";
import DrawerContents from "../components/DrawerContent";
import RulesScreen from "../screens/RulesScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import PrivacyPolicy from "../screens/PrivacyPolicyScreen";
import LanguageScreen from "../screens/LanguageScreen";

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
      <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy} />
      <Drawer.Screen name="Language" component={LanguageScreen} />
    </Drawer.Navigator>
  );
}

export default MainDrawer;
