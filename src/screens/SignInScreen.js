import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../assets/theme";
import { useUser } from "../components/Providers/WithUser";
import FieldError from "../components/FieldError";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: 'column',
  },
  inputContainer: {
    alignSelf: "center",
    backgroundColor: theme.colors.table,
    width: "80%",
    padding: 15,
    paddingBottom: 60
  },
  inputfield: {
    marginVertical: 15,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 3,
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
    backgroundColor: "#fff",
  },
  buttonLabel: {
    fontSize: 20,
  },
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

  const navigate = useNavigation();
  const { signIn } = useUser();

  console.log(username);
  console.log(password);

  const handleSignIn = () => {
    signIn(username, password)
      .then(() => {
        navigate.goBack();
      })
      .catch(error => setError(errorMapping[error.code].en));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputfield}
            placeholder="eMail"
            keyboardType="email-address"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.inputfield}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <FieldError error={error} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonLabel}>SIGN IN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;
