import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: theme.palette.warning.light,
    width: "device-width, initial-scale=1.0",
    height: "100vh",
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <div>
      <Toolbar></Toolbar>
      <div className={classes.bg} id="about">
        About
      </div>
    </div>
  );
}
