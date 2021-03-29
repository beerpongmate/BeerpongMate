import React from "react";
import {StyleSheet, Text, View, SafeAreaView, Button, ImageBackground, Pressable, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { upperCase } from "lodash";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      //justifyContent: "center",
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
      height: 40,
      backgroundColor: "grey",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
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
const continueButton = (props) => {

  const TexColor = "white"
}


function SignInSuccessScreen() {
  const { navigate } = useNavigation();


  return (
    <View style={styles.container}>

      <ImageBackground
        source={BeerpartyImg}
        style={styles.image}
      />

      <View>
    
        <Text style={styles.title}>
          erfolgreich eingeloggt  
{' '}
<Icon name="thumb-up" size ={25}/>
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigate('Welcome')}>
        <Text style={styles.buttonText}>Continue to Sign In</Text>
      </TouchableOpacity>

    </View>
  );
}

export default SignInSuccessScreen;
