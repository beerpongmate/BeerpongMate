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

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignInSuccessScreen" component={SignInSuccessScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Online" component={OnlineScreen} />
    <Stack.Screen name="Lobby" component={LobbyScreen} />
    <Stack.Screen name="Match" component={MatchScreen} />
    <Stack.Screen name="MatchLanding" component={MatchLandingScreen} />
    <Stack.Screen name="Stats" component={StatsScreen} />
  </Stack.Navigator>
);

export default MainStack;
