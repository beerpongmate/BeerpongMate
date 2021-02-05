import React, { useContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

const UserContext = React.createContext({});

export const useUser = () => useContext(UserContext);

const WithUser = ({ children }) => {
  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChanged = (authUser) => {
    setUser(authUser);
  };
  const signOut = () => auth().signOut();

  const signIn = (username, password) =>
    auth().signInWithEmailAndPassword(username, password);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default WithUser;
