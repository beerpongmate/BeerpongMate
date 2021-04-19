import React from "react";
import {StyleSheet, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Onboarding from 'react-native-onboarding-swiper';
import SplashScreen from "react-native-splash-screen";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import theme from "../../assets/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "contain",
    },
        buttonText: {
          fontSize: 10,
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "white",
          justifyContent: "center",
    },
});

const primaryColor = theme.colors.cupRed
const secondaryColor = theme.colors.cupBlue


const Skip = ({...props}) => (
  <PrimaryButton
    label="Skip"
    color={primaryColor}
    {...props} // is that correct?
  />
);
const Next = ({...props}) => (
  <PrimaryButton
    label="Next"
    color={secondaryColor}
    {...props} // is that correct?
  />
);
const Done = ({...props}) => (
  <PrimaryButton
    label="Got it"
    color={secondaryColor}
    {...props} 
  />
);

const OnboardingScreen = ({navigation}) => {

    const { navigate } = useNavigation();

    React.useEffect(() => {
        SplashScreen.hide();
    });

    return(
      <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
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