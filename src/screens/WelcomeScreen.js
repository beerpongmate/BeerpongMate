import { SafeAreaView, Text, StyleSheet, Button, Image, Dimensions } from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../components/Providers/WithUser";
import getUserMatchModel from "../utils/getUserMatchModel";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import theme from "../../assets/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    backgroundColor: '#fff',
  },
  helloWorld: {
    textAlign: "center",
    fontFamily: 'Rubik'
  },
});

const img = require('../../assets/images/logo_welcome.png');

const screenWidth = Dimensions.get('window').width;
const logoHeight = screenWidth * 1;

const primaryColor = theme.colors.cupRed;
const secondaryColor = theme.colors.cupBlue;

const WelcomeScreen = () => {
  const { navigate } = useNavigation();

  const { user, signOut } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ position: 'absolute', width: '100%', height: logoHeight , top: 0, alignSelf: 'flex-start' }}
        resizeMode='contain'
        source={img}
      />
      <Text style={styles.helloWorld}>{user ? user.displayName : "Guest"}</Text>
    
      {user && (
        <>
          <PrimaryButton onPress={() => navigate("Online")} label="Online Match" color={primaryColor} />
          <PrimaryButton onPress={() => navigate("Stats")} label="Statistics" color={secondaryColor} />
          <PrimaryButton onPress={() => navigate("Achievements")} label="Achievements" />
        </>
      )}
      {!user && (
        <>
          <PrimaryButton onPress={() => navigate("SignIn")} label="Sign In" color={primaryColor} />
          <PrimaryButton onPress={() => navigate("SignUp")} label="Create Account" color={secondaryColor} />
        </>
      )}
      <PrimaryButton
        onPress={() =>
          navigate("Match", { players: [getUserMatchModel(user)] })}
        label="Practice Mode"
      />
      {user &&  (
        <PrimaryButton onPress={signOut} label="Sign Out" />
      )}
      
    </SafeAreaView>
  );
};

export default WelcomeScreen;
