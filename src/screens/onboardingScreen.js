import React from "react";
import {View, Text, Button, StyleSheet, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Onboarding from 'react-native-onboarding-swiper';
import SplashScreen from "react-native-splash-screen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "contain",
    
    },
});

const OnboardingScreen = ({navigation}) => {

    const { navigate } = useNavigation();

    React.useEffect(() => {
        SplashScreen.hide();
    });

    return(
      <Onboarding
        styles={styles.container}
        onDone={() => navigate("MainDrawer")}
        onSkip={() => navigate("MainDrawer")}
        pages={[
    {
      backgroundColor: '#fff',
      // image: <Image source={require('../../assets/images/Beerparty.jpg')} />,
      title: 'Welcome to Beerpong Portals',
      subtitle: 'you can connect with your friends from anywhere you want - anytime',
    },
    {
        backgroundColor: '#fff',
        // image: <Image source={require('../../assets/images/cup_real.png')} />,
        title: 'What you need',
        subtitle: 'Cups, Balls, Table, Device to record your Game',
      },
      {
        backgroundColor: '#fff',
        // image: <Image source={require('../../assets/images/cup_real.png')} />,
        title: 'Connect with Discord',
        subtitle: 'once you are logged in and joined a Lobby, we will send you a Discord link',
      },
      {
        backgroundColor: '#fff',
        // image: <Image source={require('../../assets/images/cup_real.png')} />,
        title: 'Lets go',
        subtitle: 'lets go',
      },
  ]}
      />
  );
}; 
export default OnboardingScreen;