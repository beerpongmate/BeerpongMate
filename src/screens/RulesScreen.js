import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
    // alignItems:"center",
  },
  scrollView: {
    marginHorizontal: 20,
    top: 65
  },
  text: {
    fontSize: 16,
    marginBottom: 45,
    alignContent: "center",
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
    // fontWeight: "100",
    fontFamily: "Rubik",
    lineHeight: 30
  },
  heading: {
    fontSize: 30,
    marginBottom: 45,
    fontStyle: "italic",
    letterSpacing: 1,
    textDecorationLine: "underline",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Rubik"
  }
});

const Rules = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <TouchableOpacity
      style={{ margin: 16, position: "absolute", top: 40, zIndex: 10 }}
      onPress={navigation.openDrawer}
    >
      <Icon name="format-align-justify" size={34} color="black" />
    </TouchableOpacity>
    <ScrollView style={styles.scrollView}>
      <Text style={styles.heading}>Setup</Text>
      <Text style={styles.text}>
        Arrange ten (typically 18oz or 16oz) cups in a pyramid-like formation. Fill each cup with the desired amount of beer (or
        any other beverage of your choice)
      </Text>

      <Text style={styles.heading}>General Gameplay</Text>
      <Text style={styles.text}>
        Beer Pong is generally played by teams of two in which each team takes
        turn throwing a table tennis ball into the other team’s cups. Of course you can crank up the casual 1v1 in this App aswell.
        Once a ball lands in a cup, the cup is taken away. If both teammates hit cups, the balls are
        rolled back and they get to shoot again. The team that successfully hits
        all of the opponent’s cups wins the game. Since there are a vast amount
        of variation on the game, it is good to quickly go over things like
        racks and bouncing/swatting before the game begins.
      </Text>
      <Text style={styles.heading}>Deciding who goes first</Text>

      <Text style={styles.text}>
        Generally you settle this in a game of rock, paper, scissors!
      </Text>

      <Text style={styles.heading}>Re-Rack</Text>

      <Text style={styles.text}>
        Twice per game, each team gets their cups rearranged at the
        start of their turn. This is known as re-racking, racking, or reforming.
        Racking takes place when you have remaining cups in the amount of 6,
        3, or 1.
      </Text>

      <Text style={styles.heading}>Rebuttal</Text>
      <Text style={styles.text}>
        After the last cup is hit each player from the losing team has a chance
        to hit the remaining cups. Each player shoots until they miss, the order
        in which this is done does not matter. If there are racks left over they
        may be used now. Once both players miss and there are remaining cups,
        the game is over. If the players manage to hit all remaining cups the
        game goes into a 3 cup overtime.
      </Text>

      <Text style={styles.heading}>Overtime</Text>

      <Text style={styles.text}>
        After the last cup is hit each player from the losing team has a chance
        to hit the remaining cups. Each player shoots until they miss, the order
        in which this is done does not matter. If there are racks left over they
        may be used now. Once both players miss and there are remaining cups,
        the game is over. If the players manage to hit all remaining cups the
        game goes into a 3 cup overtime.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default Rules;
