import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import HomeRoutes from "./routes";
import SignUpRoutes from "../../signUp/components/routes";
import DashBordRoutes from "../../dashbord/components/routes";

export default function Layout() {
  return (
    <>
      <CssBaseline></CssBaseline>
      <Switch>
        <Route path="/dashbord">
          <DashBordRoutes></DashBordRoutes>
        </Route>
        <Route path="/signup">
          <SignUpRoutes></SignUpRoutes>
        </Route>
        <Route path="/">
          <HomeRoutes></HomeRoutes>
        </Route>
      </Switch>
    </>
  );
}
