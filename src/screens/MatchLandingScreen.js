import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../components/Providers/WithUser";
import useLobby from "../components/Providers/useLobby";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import theme from "../../assets/theme";
import ThemedText from "../components/ThemedComponents/ThemedText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: "black",
    textAlign: "center",
    fontSize: 24
  },
  player: {
    color: "black",
    textAlign: "center",
    fontSize: 18
  },
  bottomOffset: {
    marginBottom: 40
  }
});

const MatchLandingScreen = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const {
    matchData: { winningTeam, players },
    lobbyId
  } = params || {
    matchData: {
      winningTeam: 0,
      players: [{ uid: "0", team: 0, name: "whak" }]
    }
  };
  const { user } = useUser();
  const { lobby, deleteLobby } = useLobby({
    lobbyId,
    userId: user.uid
  });

  const handleContinue = () => {
    if (lobby?.host?.uid === user.uid) {
      deleteLobby().finally(() => navigate("MainDrawer"));
    } else {
      navigate("MainDrawer");
    }
  };
  const primaryColor = theme.colors.cupRed;

  const renderWinner = () => {
    if (winningTeam === -1) {
      return <ThemedText style={styles.title}>Draw</ThemedText>;
    }

    return (
      <>
        <ThemedText style={styles.title}>Congratulations</ThemedText>
        {players
          .filter(({ team }) => team === winningTeam)
          .map(({ name }) => (
            <ThemedText style={styles.player}>{name}</ThemedText>
          ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>{renderWinner()}</View>
      <PrimaryButton
        style={[styles.button, styles.bottomOffset]}
        label="Continue"
        onPress={() => navigate("MainDrawer")}
        color={primaryColor}
      />
    </View>
  );
};

export default MatchLandingScreen;
