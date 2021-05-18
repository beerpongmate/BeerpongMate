import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";
import RNBootSplash from "react-native-bootsplash";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import theme from "../../assets/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain"
  },
  buttonText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
    justifyContent: "center"
  },
  imageStyle: {
    width: "100%",
    height: 150,
    resizeMode: "contain"
  },
  snoozedImage: {
    width: 600,
    height: 600,
    marginBottom: -150,
    marginTop: -150
  },
  bellImage: {
    width: 250,
    height: "100%",
    marginBottom: -400,
    marginTop: -50,
  },
  carryImage: {
    width: 290,
    height: "100%",
    marginBottom: -400,
    marginTop: -50,
  },
  background: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const primaryColor = theme.colors.cupRed;
const secondaryColor = theme.colors.cupBlue;

const Skip = ({ ...props }) => (
  <PrimaryButton
    label="Skip"
    color={primaryColor}
    {...props} // is that correct?
  />
);
const Next = ({ ...props }) => (
  <PrimaryButton
    label="Next"
    color={secondaryColor}
    {...props} // is that correct?
  />
);
const Done = ({ ...props }) => (
  <PrimaryButton label="Got it" color={secondaryColor} {...props} />
);
const Dots = ({ selected }) => {
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
};

const OnboardingScreen = ({ route, navigation }) => {
  const { navigate } = useNavigation();
  const { inDrawer } = route?.params || {};
  const [resetOnboarding, setResetOnboarding] = React.useState(false);

  React.useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  const exitFn = inDrawer
    ? () => {
        navigation.goBack();
        setResetOnboarding(!resetOnboarding);
      }
    : () => navigate("MainDrawer");

  return (
    <View style={styles.background}>
      <Onboarding
        key={resetOnboarding ? "Harold" : "Kumar"}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onDone={exitFn}
        onSkip={exitFn}
        bottomBarHeight={100}
        bottomBarColor="#fff"
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.snoozedImage}
                source={require("../../assets/images/achievements/snoozed.png")}
              />
            ),
            title: "Bored?",
            subtitle: ""
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.imageStyle}
                source={require("../../assets/images/bpLogo.png")}
              />
            ),
            title: "Welcome to Beerpong Portals",
            subtitle:
              "you can connect with your friends from anywhere you want - anytime"
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.bellImage}
                source={require("../../assets/images/achievements/fire.png")}
              />
            ),
            title: "What you need",
            subtitle:
              "In addition to your basic beerpong equipment (cups, table, balls) you will need an extra device to record you and your setup for your opponent to see. We will send you a Discord link via Mail. Open this link on any browser on your second device"
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.imageStyle}
                source={require("../../assets/images/DiscordLogo.png")}
              />
            ),
            title: "Connect with Discord",
            subtitle:
              "Discord is a well established third party streaming provider. It is completely free and easy to use. Head over to Discord and create an account before you start your first match. You can stream your game, chat and have a good time. For every Match, the App will create a separate Discord channel for a little privacy"
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.carryImage}
                source={require("../../assets/images/achievements/carry.png")}
              />
            ),
            title: "Earn great achievements",
            subtitle:
              "Mark your game progress in the app to keep track of your match. For every match played you can unlock great achievements and track your skill in a lifetime statistic. Good luck and bottoms up!"
          }
        ]}
      />
    </View>
  );
};
export default OnboardingScreen;
