import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../components/Providers/WithUser";
import getUserMatchModel from "../utils/getUserMatchModel";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  helloWorld: {
    textAlign: "center",
  },
});

const WelcomeScreen = () => {
  const { navigate } = useNavigation();

  const { user, signOut } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.helloWorld}>{user ? user.displayName : "Guest"}</Text>
      <Button
        onPress={() =>
          navigate("Match", { players: [getUserMatchModel(user)] })}
        title="Offline Match"
      />
      {user && (
        <Button onPress={() => navigate("Online")} title="Online Match" />
      )}
      {!user ? (
        <>
          <Button onPress={() => navigate("SignIn")} title="Sign In" />
          <Button onPress={() => navigate("SignUp")} title="Sign Up" />
        </>
      ) : (
        <Button onPress={signOut} title="Sign Out" />
      )}
    </SafeAreaView>
  );
};

export default WelcomeScreen;
