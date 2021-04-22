import React from "react";
import {StyleSheet, Image, View} from "react-native";
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
    imageStyle: {
      width: "100%",
      height: 150,
      resizeMode: "contain",
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
const Dots = ({selected}) => {
const backgroundColor = selected ? primaryColor : secondaryColor;

return (
  <View
    style={{
      width: 6,
      height: 6,
      marginHorizontal: 3,
      borderRadius: 3,
      backgroundColor  
}}
  />
);
}

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
        DotComponent={Dots}
        onDone={() => navigate("MainDrawer")}
        onSkip={() => navigate("MainDrawer")}
        pages={[
    {
      backgroundColor: '#fff',
      image: <Image style={styles.imageStyle} source={require('../../assets/images/bpLogo.png')} />,
      title: 'Welcome to Beerpong Portals',
      subtitle: 'you can connect with your friends from anywhere you want - anytime',
    },
    {
        backgroundColor: '#fff',
        // image: <Image style={styles.imageStyle} source={require('../../assets/images/cup_real.png')} />,
        title: 'What you need',
        subtitle: 'In addition to your basic beerpong experience (cups, table, balls) you will need an extra device to record you and your setup for your opponent to see.',
      },
      {
        backgroundColor: '#fff',
        image: <Image style={styles.imageStyle} source={require('../../assets/images/DiscordLogo.png')} />,
        title: 'Connect with Discord',
        subtitle: 'once you are logged in and joined a lobby, we will send you and your mates a Discord link. Discord is a well established third party streaming provider. It is completely free and easy to use. Head over to Discord and create an account before you start your first match. ',
      },
      {
        backgroundColor: '#fff',
        // image: <Image source={require('../../assets/images/cup_real.png')} />,
        title: 'Lets go',
        subtitle: 'mark your game progress in the app to keep track of your match. For every match played you can unlock great achievements and track your skill in a lifetime statistic. Good luck and bottoms up!',
      },
  ]}
      />
  );
}; 
export default OnboardingScreen;