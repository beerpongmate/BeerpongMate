import {
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  View
} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import RNBootSplash from "react-native-bootsplash";
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
    justifyContent: "flex-end",
    backgroundColor: "#fff"
  },
  helloWorld: {
    textAlign: "center"
  }
});

const img = require("../../assets/images/logo/logo_banner.png");

const screenWidth = Dimensions.get("window").width;
const logoHeight = screenWidth * 1;

const primaryColor = theme.colors.cupRed;
const secondaryColor = theme.colors.cupBlue;

const WelcomeScreen = ({ navigation }) => {
  const { navigate } = useNavigation();

  const { user, signOut } = useUser();

  React.useEffect(() => {
    AsyncStorage.setItem("showOnboarding", "false").catch(console.error);
    RNBootSplash.hide({ fade: true });
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ margin: 16, position: "absolute", top: 40, zIndex: 10 }}
        onPress={navigation.openDrawer}
      >
        <Icon name="format-align-justify" size={34} color="black" />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          style={{
            // position: "absolute",
            width: "100%",
            height: logoHeight,
            top: 0,
            alignSelf: "flex-start"
          }}
          resizeMode="contain"
          source={img}
        />
      </View>
      <View>
        <ThemedText style={styles.helloWorld}>
          {user ? user.displayName : "Guest"}
        </ThemedText>

        {user && (
          <>
            <WelcomeButton
              onPress={() => navigate("Online")}
              label="Online Match"
              color={primaryColor}
            />
            <WelcomeButton
              onPress={() => navigate("Stats")}
              label="Statistics"
              color={secondaryColor}
            />
            <WelcomeButton
              onPress={() => navigate("Achievements")}
              label="Achievements"
            />
          </>
        )}
        {!user && (
          <>
            <WelcomeButton
              onPress={() => navigate("SignIn")}
              label="Sign In"
              color={primaryColor}
            />
            <WelcomeButton
              onPress={() => navigate("SignUp")}
              label="Create Account"
              color={secondaryColor}
            />
          </>
        )}
        <WelcomeButton
          onPress={() =>
            navigate("Match", { players: [getUserMatchModel(user)] })}
          label="Practice Mode"
        />
        {user && <WelcomeButton onPress={signOut} label="Sign Out" />}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
