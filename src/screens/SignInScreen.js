import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../assets/theme";
import { useUser } from "../components/Providers/WithUser";
import FieldError from "../components/FieldError";

const cupImg = require('../../assets/images/cup_real.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: 'column'
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
    width: 120, 
    height: 120,    
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: -60,
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

const screenWidth = Dimensions.get('window').width;
const cupHeight = screenWidth * 1.2;

const SignInScreen = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const bottomOffset = useRef(new Animated.Value(0)).current;
  const ballScale = useRef(new Animated.Value(1)).current;
  const ballIndex = useRef(2);


  const { navigate } = useNavigation();

  const { signIn } = useUser();

  const handleSignIn = () => {
    signIn(username, password)
      .then(() => {
        navigate('SignInSuccessScreen');
      })
      .catch(error => {
        ballScale.setValue(1);
        bottomOffset.setValue(0);
        setError(errorMapping[error.code].en);
      });
  };

  const triggerAnimation = () => {
    Animated.parallel([
    Animated.timing(bottomOffset, {
      toValue: cupHeight,
      duration: 600,
      easing: Easing.out(Easing.sin)
    }),
    Animated.timing(ballScale, {
      toValue: 0.8,
      duration: 600,
      easing: Easing.out(Easing.sin)
    }),
  ]).start(() => {
    Animated.timing(bottomOffset, {
      toValue: cupHeight - 70,
      duration: 150,
      easing: Easing.sin
    }).start(() => {
      handleSignIn();
    });
  });
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground style={{ height: cupHeight, width: '100%', justifyContent: 'center' }} resizeMode='contain' source={cupImg}>
          <View style={{ flex: 1, paddingHorizontal: 100 }}>
            <View style={{ flex: 1, justifyContent: 'center'}}> 
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
            
            <Animated.View style={{ 
              position: 'absolute', 
              transform: [{ scale: ballScale }], 
              bottom: bottomOffset,
              zIndex: ballIndex.current,  
              left: '50%', 
              right: '50%' }}
            >
              <TouchableOpacity style={styles.button} onPress={triggerAnimation}>
                <Text style={styles.buttonLabel}>SIGN IN</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ImageBackground>
        
        
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;
