import React from "react";
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
import MainDrawer from "../screens/MainDrawer";

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="MainDrawer">
    <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignInSuccessScreen" component={SignInSuccessScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Online" component={OnlineScreen} />
    <Stack.Screen name="Lobby" component={LobbyScreen} />
    <Stack.Screen name="Match" component={MatchScreen} />
    <Stack.Screen name="MatchLanding" component={MatchLandingScreen} />
    <Stack.Screen name="Stats" component={StatsScreen} />
    <Stack.Screen name="Achievements" component={AchievementsScreen} />
    <Stack.Screen name="MainTab" component={MainTabScreen} />
  </Stack.Navigator>
);

export default MainStack;
