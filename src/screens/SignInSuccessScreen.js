import React from "react";
import {StyleSheet, Text, View, SafeAreaView, Button, ImageBackground, Pressable, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { upperCase } from "lodash";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import theme from "../../assets/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // justifyContent: "center",
      alignItems: 'center',
      flexDirection: 'column',
    },
    buttonContainer:{
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      flexDirection: 'column',},
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
      position: "absolute",
    },
    title: {
      color: "white",
      fontSize: 25,
      fontWeight: "500",
      top: 30,
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

const BeerpartyImg = require('../../assets/images/Beerparty.jpg');

const primaryColor = theme.colors.cupRed



function SignInSuccessScreen() {
  const { navigate } = useNavigation();


  return (
    <View style={styles.container}>

      <ImageBackground
        source={BeerpartyImg}
        style={styles.image}
      />
    
      <Text style={styles.title}>
        erfolgreich eingeloggt  
        {' '}
        <Icon name="thumb-up" size={25} />
      </Text>

      <PrimaryButton style={styles.button} label="Continue" onPress={() => navigate('Welcome')} color={primaryColor} />

    </View>
  );
}

export default SignInSuccessScreen;
