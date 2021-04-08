import React from "react";
import {StyleSheet, View, ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import theme from "../../assets/theme";
import ThemedText from "../components/ThemedComponents/ThemedText";
import { useUser } from "../components/Providers/WithUser";

const styles = StyleSheet.create({
    container: {
      flex: 3,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: 'center',
      flexDirection: 'column',
    },
    buttonContainer:{
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      flexDirection: 'column',},
    image: {
      width: 300,
      height: 350,
      resizeMode: "contain",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 60,
    },
    title: {
      color: "black",
      fontSize: 25,
      fontWeight: "500",
      bottom: 275,
      fontFamily: 'Rubik',
    },
    button: {
      width: "90%",
      position: "absolute",
      bottom: 70,

    },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "white",
      justifyContent: "center",


    }
});

const SuccessImg = require('../../assets/images/Success.png');

const primaryColor = theme.colors.cupRed



function SignInSuccessScreen() {
  const { navigate } = useNavigation();
  const { user: { displayName } } = useUser();


  return (
    <View style={styles.container}>

      <ImageBackground
        source={SuccessImg}
        style={styles.image}
      />
      <ThemedText style={styles.title}>
        Welcome 
        {' '}
        {displayName}
        !
      </ThemedText>
      <PrimaryButton style={styles.button} label="Continue" onPress={() => navigate('Welcome')} color={primaryColor} />
    </View>
  );
}

export default SignInSuccessScreen;
