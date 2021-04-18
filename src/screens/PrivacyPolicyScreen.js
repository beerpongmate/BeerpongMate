import React from "react";
import {
  SafeAreaView,
  Linking,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import ThemedText from "../components/ThemedComponents/ThemedText";

const url = "https://www.iubenda.com/privacy-policy/10471681";

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    margin: 15,
    textAlign: "center"
  },
  container: {
    flex: 1
  }
});

const PrivacyPolicy = ({ navigation }) => {
  const openPolicy = () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ margin: 16, position: "absolute", top: 40, zIndex: 10 }}
        onPress={navigation.openDrawer}
      >
        <Icon name="format-align-justify" size={34} color="black" />
      </TouchableOpacity>
      <View style={styles.center}>
        <ThemedText style={styles.text}>
          Please find our Privacy Policy below. Pressing the button will open it
          outside the App in your browser.
        </ThemedText>
        <PrimaryButton label="Privacy Policy" onPress={openPolicy} />
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
