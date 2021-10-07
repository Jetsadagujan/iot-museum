import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Grid } from "@material-ui/core";
import Png from "../../../assets/architecture-interior-building-palace-old-statue-144771-pxhere.com.jpg";
import ButtonDash from "./buttondas";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundImage: `url(${Png})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "device-width, initial-scale=1.0",
    height: "100vh",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Toolbar></Toolbar>
      <Grid className={classes.bg} id="home">
        <ButtonDash></ButtonDash>
      </Grid>
    </>
  );
}
