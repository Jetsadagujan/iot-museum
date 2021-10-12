import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
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
    <Grid item xs={12}>
      <Toolbar></Toolbar>
      <Grid item className={classes.bg} id="home" xs={12}>
        <Grid item xs={4}>
          <Card
            sx={{ minWidth: 275 }}
            elevation={10}
            style={{
              position: "absolute",
              top: "100px",
              left: "100",
              width: "400px",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom component="div">
                Internet of things
                <br />
                {'"for Museum and Art Gallery"'}
              </Typography>
              <hr></hr>
              <Typography variant="subtitle2" gutterBottom component="div">
                because it's not just a thing
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
        <div
          style={{
            position: "absolute",
            top: "260px",
            left: "100px",
            width: "400px",
          }}
        >
          <ButtonDash></ButtonDash>
        </div>
      </Grid>
    </Grid>
  );
}
