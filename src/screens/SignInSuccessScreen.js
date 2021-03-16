import React from "react";
import {StyleSheet, Text, View, SafeAreaView, Button} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: 'center',
      flexDirection: 'column',
    },

});

const SignInSuccessScreen = () => {
  const { navigate } = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="thumb-up"
        size={24}
      />
      <Text>
        erfolgreich eingeloggt!
      </Text>
      <Button title="Continue to Sign In" onPress={()=> navigate('Welcome')} />
    </SafeAreaView>
  );
};

export default SignInSuccessScreen;
