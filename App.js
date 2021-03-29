/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";
import WithUser from "./src/components/Providers/WithUser";
import WithAchievements from "./src/components/Providers/WithAchievements";

const App = () => (
  <WithUser>
    <WithAchievements>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </WithAchievements>
  </WithUser>
);

export default App;
