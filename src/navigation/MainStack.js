import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MatchScreen from "../screens/MatchScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OnlineScreen from "../screens/OnlineScreen";
import LobbyScreen from "../screens/LobbyScreen";
import SignInSuccessScreen from "../screens/SignInSuccessScreen";
import MatchLandingScreen from "../screens/MatchLandingScreen";
import StatsScreen from "../screens/StatsScreen";
import AchievementsScreen from "../screens/AchievementScreen";
import MainTabScreen from "../screens/MainTabScreen";
import theme from "../../assets/theme";

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerTitle: () => <View style={{ height: 20 }} />,
      // headerTransparent: true,
      headerStyle: {},
      headerBackTitle: "Back",
      headerTintColor: theme.colors.cupBlue,
      headerTitleStyle: {}
    }}
  >
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen
      name="SignInSuccessScreen"
      component={SignInSuccessScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Online" component={OnlineScreen} />
    <Stack.Screen
      name="Lobby"
      component={LobbyScreen}
      options={{ headerBackTitle: "Leave" }}
    />
    <Stack.Screen name="Match" component={MatchScreen} />
    <Stack.Screen
      name="MatchLanding"
      component={MatchLandingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Stats" component={StatsScreen} />
    <Stack.Screen name="Achievements" component={AchievementsScreen} />
    <Stack.Screen
      name="MainTab"
      component={MainTabScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MainStack;
