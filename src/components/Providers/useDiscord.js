import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";
import { useUser } from "./WithUser";

const useDiscord = () => {
    const { user } = useUser();
  const [discord, setDiscord] = useState(null);
  const discordRef = firestore()
            .collection('Discord')
            .doc(user?.uid);
  const refresh = () => discordRef.get().then(
                ref => {
                    if (ref.exists) {
                        setDiscord(ref.data());
                    } else {
                        discordRef.set({
                            discordUserId: null
                        }
                        ).then(refresh).catch(console.log);
                    }
                 }).catch(console.log);

    useEffect(() => {
        refresh();
     }, []);
 
  return {
     discord, refresh
  };
}
 
export default useDiscord;