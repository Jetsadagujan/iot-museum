import React from "react";
import Layout from "./modules/ui/components/layout";
import { AuthProvider } from "./context/componentss/context";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
//import FireStore from "./textFireStore/fireStore";

export default function App() {
  // return (
  //   <>
  //     <FireStore></FireStore>
  //   </>
  // );
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Layout></Layout>
        </Router>
      </SnackbarProvider>
    </AuthProvider>
  );
}
