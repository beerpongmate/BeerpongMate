import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../assets/theme";
import { useUser } from "../components/Providers/WithUser";
import FieldError from "../components/FieldError";
import ThemedText from "../components/ThemedComponents/ThemedText";
import PrimaryButton from "../components/Buttons/PrimaryButton";

const cupImg = require("../../assets/images/cup_real.jpg");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column"
  },
  inputfield: {
    marginVertical: 15,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.cupBlue,
    fontSize: 18,
    height: 50,
    fontWeight: "bold"
  },
  headerText: {
    fontSize: 38,
    marginBottom: 25,
    textAlign: "center"
  },
  inputContainer: {
    marginHorizontal: 15
  }
});

const errorMapping = {
  "auth/user-not-found": {
    de: "This user does not exist.",
    en: "Whatever"
  }
};

const SignInScreen = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const passwordInput = useRef();

  const { navigate } = useNavigation();

  const { signIn } = useUser();

  const handleSignIn = () => {
    setLoading(true);
    signIn(username, password)
      .then(() => {
        navigate("SignInSuccessScreen");
      })
      .catch((error) => {
        setError(error.nativeErrorMessage);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  const isDisabled = username === null || password === null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.headerText}>Welcome Back</ThemedText>

          <TextInput
            style={styles.inputfield}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setUsername}
            placeholderTextColor="grey"
            textAlign="center"
            onSubmitEditing={() => {
              passwordInput.current.focus();
            }}
            blurOnSubmit={false}
            returnKeyType="next"
          />
          <TextInput
            ref={(input) => {
              passwordInput.current = input;
            }}
            style={styles.inputfield}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor="grey"
            textAlign="center"
          />
          <FieldError error={error} />
        </View>

        <PrimaryButton
          label="Sign In"
          disabled={isDisabled || loading}
          onPress={handleSignIn}
          color={theme.colors.cupRed}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
