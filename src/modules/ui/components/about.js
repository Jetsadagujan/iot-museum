import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import bg from "../../../assets/pexels-robin-schreiner-2261165.jpg";

const useStyles = makeStyles(() => ({
  bg: {
    width: "device-width, initial-scale=1.0",
    height: "100%",
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <>
      <Toolbar></Toolbar>
      <div
        className={classes.bg}
        id="about"
        style={{
          display: "flex",
          paddingTop: "50px",
          paddingBottom: "50px",
          width: "100%",
        }}
      >
        {/* <Toolbar></Toolbar> */}
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={3}
            style={{ justifyContent: "center", display: "flex" }}
          >
            <img src={bg} alt="BigCo Inc. logo" style={{ width: "300px" }} />
          </Grid>
          <Grid
            item
            // xs={5{}}
            md={3}
            style={{ justifyContent: "center", display: "flex" }}
          >
            <Card
              style={{
                height: "420px",
                marginLeft: "50px",
                marginRight: "50px",
              }}
              xs={{ minWidth: 300 }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  <br />
                  About
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  <br />
                  It is part of the conservation thesis to preserve antiques and
                  works of art using the internet of Things integrated with the
                  website and Line notify.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
