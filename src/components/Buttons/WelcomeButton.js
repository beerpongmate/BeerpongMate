import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from 'react';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'red',
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 6,
        padding: 2,
        backgroundColor: '#fff'
    },
    innerContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'red',
        padding: 10
    },
    textStyle: {
        fontFamily: 'Rubik',
        fontSize: 24,
        textAlign: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
	        width: 1,
	        height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.22,
        elevation: 3,
    }
});

const WelcomeButton = ({ color, onPress, label }) => (
  <View style={styles.shadow}>
    <TouchableOpacity style={[styles.container, {borderColor: color}]} onPress={onPress}>
      <View style={[styles.innerContainer, {borderColor: color, backgroundColor: color}]}>
        <Text style={[styles.textStyle, { color: color ? '#fff' : 'black' }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  </View>
)

export default WelcomeButton;