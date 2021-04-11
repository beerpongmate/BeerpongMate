import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../assets/theme';
import ThemedText from "./ThemedComponents/ThemedText";

const styles = StyleSheet.create({
    text: {
        fontSize: 24
    }
});

const PlayerItem = ({ name, ready, team }) => {
    const readyLabel = ready ? "Ready To Roll" : "Getting Beer";
    const teamColor = team === 0 ? theme.colors.cupBlue : theme.colors.cupRed;
    return (
      <View>
        <ThemedText style={styles.text}>{name}</ThemedText>
        <ThemedText style={{ color: ready ? "black" : teamColor }}>{readyLabel}</ThemedText>
      </View>
);
};

export default PlayerItem;