import React from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./content";

export default function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Content></Content>
      </Route>
    </Switch>
  );
}
