import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Clipboard from "@react-native-clipboard/clipboard";
import theme from "../../assets/theme";
import useLobby from "../components/Providers/useLobby";
import { useUser } from "../components/Providers/WithUser";
import getLobbyModel from "../utils/getLobbyModel";
import ThemedText from "../components/ThemedComponents/ThemedText";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import ThemedOverlay from "../components/ThemedOverlay";
import useDiscord from "../components/Providers/useDiscord";
import LobbyComponent from "../components/LobbyComponent";
import LobbyCreateModal from "../components/LobbyCreateModal";
import PrivateSearchModal from "../components/PrivateSearchModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  lobbyContainer: {
    flex: 2,
    margin: 20
  },
  discordContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: theme.colors.cupBlue,
    margin: 15,
    borderRadius: 10,
    padding: 5
  },
  noService: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  },
  noServiceText: {
    fontSize: 18,
    margin: 20,
    textAlign: "center"
  },
  listEmptyContainer: {
    paddingTop: 50
  },
  listEmptyText: {
    textAlign: "center",
    fontSize: 24
  },
  discordButton: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10
  },
  discordText: {
    fontSize: 16,
    textAlign: "center"
  },
  discordUserText: {
    marginVertical: 5,
    fontSize: 20,
    color: theme.colors.cupBlue
  }
});

const discordLogo = require("../../assets/images/discord_logo.png");

const OnlineScreen = () => {
  const { navigate } = useNavigation();
  const { user } = useUser();
  const {
    discordInvite,
    discordName,
    discordUserId,
    isServiceOnline,
    refresh
  } = useDiscord();
  const { lobbies = [], createLobby, joinLobby, findLobby } = useLobby({
    userId: user.uid
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [privateModalVisible, setPrivateModalVisible] = useState(false);

  const handleCreate = (playerCount, isPrivate) => {
    setModalVisible(false);
    createLobby(getLobbyModel(user, playerCount, isPrivate)).then((docRef) => {
      navigate("Lobby", { lobbyId: docRef.id });
    });
  };

  const handleJoin = ({ id, players, playerCount }) => {
    if (Object.keys(players).length < playerCount) {
      joinLobby(id, user).then(() => {
        navigate("Lobby", { lobbyId: id });
      });
      return true;
    }
    return false;
  };

  const copyToClipboard = () => {
    Clipboard.setString(discordInvite);
  };

  renderDicordContent = () => {
    if (!isServiceOnline) {
      return (
        <View style={styles.noService}>
          <ThemedText style={styles.noServiceText}>
            Hello, early bird. Our Voice and Video integration is not yet open
            to the public. Please come back around 04/23/21 7:30PM CEST.
          </ThemedText>
        </View>
      );
    }

    if (discordUserId === null && !discordInvite) {
      return (
        <View style={styles.noService}>
          <ThemedText style={styles.noServiceText}>
            We are creating your invitation to our Voice and Video integration.
            Please be patient. If you are able to read this, something has
            probably gone wrong.
          </ThemedText>
        </View>
      );
    }

    if (!discordUserId && discordInvite) {
      return (
        <View style={styles.noService}>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={styles.discordButton}
          >
            <Image
              source={discordLogo}
              resizeMode="contain"
              style={{ height: 70, width: 200 }}
            />
          </TouchableOpacity>
          <ThemedText style={styles.discordText}>
            {
              "Please press this button to copy your personal invitation link to your clipboard. \n Send this link to your Video Device (not this phone) and open it in any browser. You do not need to create a discord account, you can simply dismiss the registration window. \n Finally, please join the Birthday Bash channel. The app will take it from there. \n If you are sharing your partners Video Device, you can simply disregard these steps."
            }
          </ThemedText>
        </View>
      );
    }

    if (discordUserId && discordName) {
      return (
        <View style={styles.noService}>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={styles.discordButton}
          >
            <Image
              source={discordLogo}
              resizeMode="contain"
              style={{ height: 70, width: 200 }}
            />
          </TouchableOpacity>
          <ThemedText style={styles.discordText}>
            Your linked discord user is called
          </ThemedText>
          <ThemedText style={styles.discordUserText}>{discordName}</ThemedText>
          <ThemedText style={styles.discordText}>
            Please make sure to join the Birthday Bash voice channel.
          </ThemedText>
        </View>
      );
    }
  };

  lobbies.sort((a, b) => {
    const aFull = Object.keys(a.players).length === a.playerCount ? 1 : 0;
    const bFull = Object.keys(b.players).length === b.playerCount ? 1 : 0;

    return bFull < aFull;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.discordContainer}>
        <ScrollView>{renderDicordContent()}</ScrollView>
      </View>
      <View style={styles.lobbyContainer}>
        <FlatList
          data={lobbies}
          ListEmptyComponent={(
            <View style={styles.listEmptyContainer}>
              <ThemedText style={styles.listEmptyText}>
                There are currently no lobbies open. Let's create your own!
              </ThemedText>
            </View>
          )}
          renderItem={({
            item: { id, host, matchId, players, playerCount }
          }) => (
            <LobbyComponent
              onPress={() => handleJoin({ id, matchId, players, playerCount })}
              id={id}
              host={host}
              playerCount={playerCount}
              players={players}
              matchId={matchId}
            />
          )}
        />
      </View>
      <LobbyCreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleCreate={handleCreate}
      />
      <PrivateSearchModal
        modalVisible={privateModalVisible}
        setModalVisible={setPrivateModalVisible}
        findLobby={findLobby}
        joinLobby={handleJoin}
      />
      <PrimaryButton
        onPress={() => setPrivateModalVisible(true)}
        color={theme.colors.cupBlue}
        label="Join Private Match"
      />
      <PrimaryButton
        onPress={() => setModalVisible(true)}
        color={theme.colors.cupRed}
        label="Create Lobby"
      />
    </SafeAreaView>
  );
};

export default OnlineScreen;
