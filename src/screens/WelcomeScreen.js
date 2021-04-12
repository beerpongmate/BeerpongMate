import { SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity} from "react-native";
import * as React from "react";
import { NavigationContainer , NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "../components/Providers/WithUser";
import getUserMatchModel from "../utils/getUserMatchModel";
import WelcomeButton from "../components/Buttons/PrimaryButton";
import theme from "../../assets/theme";
import ThemedText from "../components/ThemedComponents/ThemedText";
import AchievementsScreen from "./AchievementScreen";
import StatsScreen from "./StatsScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  helloWorld: {
    textAlign: "center"
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

  const Drawer = createDrawerNavigator();

  return (

    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{margin: 16,}}
       // this needs work. Weil nicht im gleichen Screen definiert?
       // onPress={this.props.navigation.openDrawer}
      >
        <Icon name="format-align-justify" size={34} color="black" />
      </TouchableOpacity>
      <Image
        style={{ marginBottom: 35, width: '100%', height: logoHeight , top: 0, alignSelf: 'flex-start' }}
        resizeMode='contain'
        source={img}
      />
      <ThemedText style={styles.helloWorld}>{user ? user.displayName : "Guest"}</ThemedText>
    
      {user && (
        <>
          <WelcomeButton onPress={() => navigate("Online")} label="Online Match" color={primaryColor} />
          <WelcomeButton onPress={() => navigate("Stats")} label="Statistics" color={secondaryColor} />
          <WelcomeButton onPress={() => navigate('Achievements')} label="Achievements" />
        </>
      )}
      {!user && (
        <>
          <WelcomeButton onPress={() => navigate("SignIn")} label="Sign In" color={primaryColor} />
          <WelcomeButton onPress={() => navigate("SignUp")} label="Create Account" color={secondaryColor} />
        </>
      )}
      <WelcomeButton
        onPress={() =>
          navigate("Match", { players: [getUserMatchModel(user)] })}
        label="Practice Mode"
      />
      {user &&  (
        <WelcomeButton onPress={signOut} label="Sign Out" />
      )}
      
    </SafeAreaView>
  );
};

export default WelcomeScreen;
