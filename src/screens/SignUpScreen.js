import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../assets/theme";
import { useUser } from "../components/Providers/WithUser";
import ThemedText from "../components/ThemedComponents/ThemedText";
import FieldError from "../components/FieldError";
import PrimaryButton from "../components/Buttons/PrimaryButton";

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

const SignInScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [username, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const navigate = useNavigation();
  const { signUp, setUsername, reload } = useUser();

  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const usernameInput = useRef();

  const handleSignUp = () => {
    setLoading(true);
    signUp(email, password)
      .then(() => {
        setUsername(username)
          .then(() => {
            reload();
            navigate.goBack();
          })
          .catch((error) => setError(error.nativeErrorMessage))
          .finally(() => {
            setTimeout(() => setLoading(false), 500);
          });
      })
      .catch((error) => setError(error.nativeErrorMessage))
      .finally(() => {
        setTimeout(() => setLoading(false), 500);
      });
  };

  const isDisabled = !email || !password || !passwordConfirm || !username;
  const passwordsDontMatch =
    password?.length > 1 &&
    passwordConfirm?.length > 1 &&
    password !== passwordConfirm;
  const passwordMatchError = passwordsDontMatch
    ? "The passwords do not match"
    : null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.headerText}>Let's get started</ThemedText>

          <TextInput
            style={styles.inputfield}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
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
            onSubmitEditing={() => {
              passwordConfirmInput.current.focus();
            }}
            blurOnSubmit={false}
            returnKeyType="next"
            style={styles.inputfield}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor="grey"
            textAlign="center"
          />
          <TextInput
            ref={(input) => {
              passwordConfirmInput.current = input;
            }}
            onSubmitEditing={() => {
              usernameInput.current.focus();
            }}
            blurOnSubmit={false}
            returnKeyType="next"
            style={styles.inputfield}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={setPasswordConfirm}
            placeholderTextColor="grey"
            textAlign="center"
          />
          <TextInput
            ref={(input) => {
              usernameInput.current = input;
            }}
            style={styles.inputfield}
            placeholder="What shall we call you?"
            onChangeText={setName}
            placeholderTextColor="grey"
            textAlign="center"
          />
          <FieldError error={passwordMatchError || error} />
        </View>

        <PrimaryButton
          label="Get Started"
          disabled={isDisabled || loading}
          onPress={handleSignUp}
          color={theme.colors.cupRed}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
