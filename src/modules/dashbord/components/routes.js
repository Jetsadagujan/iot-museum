import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashbord from "./dashbord";

export default function Routes() {
  return (
    <Switch>
      <Route path="/dashbord">
        <Dashbord></Dashbord>
      </Route>
    </Switch>
  );
}
