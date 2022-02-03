import React from "react";
import Home from "./home";
import About from "./about";
import Howto from "./howTo";
import Header from "./header";
import { Grid } from "@material-ui/core";

export default function Content() {
  return (
    <main>
      <Grid container>
        <Header></Header>
        <Home></Home>
        <About></About>
        <Howto></Howto>
      </Grid>
    </main>
  );
}
