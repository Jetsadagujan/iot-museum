import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import HomeRoutes from "./routes";
import SignUpRoutes from "../../signUp/components/routes";
import DashBordRoutes from "../../dashbord/components/routes";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export default function Layout() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#ffb74d",
        main: "#ff9800",
        dark: "#f57c00",
        contrastText: "#fff",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}
