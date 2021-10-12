import React, { useState, useEffect } from "react";
import firebaseConfig from "../../firebase/config/config";
import LoadingPage from "../../modules/dashbord/components/loadingPage";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userContext, setUsercontext] = useState(null);

  useEffect(() => {
    console.log("in");

    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("in A");
    });
    if (currentUser) {
      console.log("in B");
      async function get() {
        try {
          const data = await firebaseConfig
            .firestore()
            .collection("user")
            .where("email", "==", `${currentUser.email}`)
            .get();
          const dataSearch = data.docs.map((eachDaea) => eachDaea.data());
          console.log("====", dataSearch);
          setUsercontext(dataSearch);
        } catch (error) {}
      }
      get();
    } else {
      setUsercontext(undefined);
    }
  }, [currentUser]);

  // useEffect(() => {

  // }, [currentUser]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider value={{ currentUser, userContext }}>
      {children}
    </AuthContext.Provider>
  );
};
