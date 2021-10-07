import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "./signUp";

export default function Routes() {
  return (
    <Switch>
      <Route path="/signUp">
        <SignUp></SignUp>
      </Route>
    </Switch>
  );
}
