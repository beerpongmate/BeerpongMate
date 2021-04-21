import firestore from "@react-native-firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { useUser } from "./WithUser";

const useDiscord = () => {
  const { user } = useUser();
  const [discord, setDiscord] = useState(null);
  const [isOnline, setOnline] = useState(false);
  const subscriber = useRef(() => {});

  const { discordInvite, discordName, discordUserId } = discord || {};

  const discordServiceRef = firestore().collection("Services").doc("Discord");

  const discordRef = firestore().collection("Discord").doc(user?.uid);

  const listenToChanges = () => {
    subscriber.current();
    subscriber.current = discordRef.onSnapshot(
      (documentSnapshot) => {
        setDiscord(documentSnapshot.data());
      },
      (error) => console.log(error)
    );
  };

  const refresh = () =>
    discordRef
      .get()
      .then((ref) => {
        if (ref.exists) {
          listenToChanges();
        } else {
          discordRef
            .set({
              discordUserId: null
            })
            .then(refresh)
            .catch(console.log);
        }
      })
      .catch(console.log);

  useEffect(() => {
    discordServiceRef
      .get()
      .then((ref) => {
        if (ref.exists) {
          setOnline(ref.data()?.active);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (isOnline) {
      refresh();
    }

    return () => {
      subscriber.current();
    };
  }, [isOnline]);

  return {
    discordInvite,
    discordName,
    discordUserId,
    isServiceOnline: isOnline,
    refresh
  };
};

export default useDiscord;
