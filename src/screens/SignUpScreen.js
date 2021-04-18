import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../assets/theme";
import { useUser } from "../components/Providers/WithUser";
import ThemedText from "../components/ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  inputContainer: {
    alignSelf: "center",
    backgroundColor: theme.colors.cupRed,
    width: "80%",
    padding: 15,
    paddingBottom: 60
  },
  inputfield: {
    marginVertical: 15,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 3
  },
  button: {
    alignSelf: "center",
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
    backgroundColor: "#fff"
  },
  buttonLabel: {
    fontSize: 20
  }
});

const SignInScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setName] = useState(null);

  const navigate = useNavigation();
  const { signUp, setUsername } = useUser();

  const handleSignUp = () => {
    if (username) {
      signUp(email, password)
        .then(() => {
          setUsername(username)
            .then(() => {
              navigate.goBack();
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputfield}
          placeholder="eMail"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputfield}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.inputfield}
          placeholder="What shall we call you?"
          onChangeText={setName}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <ThemedText style={styles.buttonLabel}>SIGN UP</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignInScreen;
