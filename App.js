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

const App = () => (
  <WithUser>
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  </WithUser>
);

export default App;
