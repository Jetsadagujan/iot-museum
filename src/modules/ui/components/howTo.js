import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: theme.palette.warning.main,
    width: "device-width, initial-scale=1.0",
    height: "100vh",
  },
}));

export default function Howto() {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Toolbar></Toolbar>
      <div className={classes.bg} id="howTo">
        Howto
      </div>
    </Grid>
  );
}
