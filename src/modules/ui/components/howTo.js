import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
// import Create from "@material-ui/icons/PersonAdd";
import Create from "../../../assets/add-user.png";
import Dashbors from "../../../assets/home.png";
import Addroom from "../../../assets/add.png";
import Aadpdf from "../../../assets/document.png";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: theme.palette.warning.main,
    width: "100%",
    height: "100%",
    paddingTop: "50px",
    paddingBottom: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Howto() {
  const classes = useStyles();
  return (
    <>
      <Toolbar></Toolbar>
      <div className={classes.bg} id="howTo">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ padding: "20px" }}
        >
          <Grid
            item
            xs={12}
            md={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="h3" style={{ color: "white" }}>
              How to use.
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} style={{ paddingTop: "50px" }}>
            <Card sx={{ maxWidth: 300 }} style={{ height: "450px" }}>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img
                  src={Create}
                  alt="account"
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                ></img>
              </div>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  1
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Create your account
                </Typography>
                <Typography variant="body2">
                  Click the login button to sign up an account and remember to
                  check your work ID is valid.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} style={{ paddingTop: "50px" }}>
            <Card sx={{ maxWidth: 300 }} style={{ height: "450px" }}>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img
                  src={Dashbors}
                  alt="account"
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                ></img>
              </div>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  2
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Go to dashboard
                </Typography>
                <Typography variant="body2">
                  login Use the code that you have registered, then the go to
                  dashboard button will turn yellow, click the go to dashboard
                  button to access the system.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} style={{ paddingTop: "50px" }}>
            <Card sx={{ maxWidth: 300 }} style={{ height: "450px" }}>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img
                  src={Addroom}
                  alt="account"
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                ></img>
              </div>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  3
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Add a room to use the system.
                </Typography>
                <Typography variant="body2">
                  In the process of adding a room, it is necessary to enter all
                  fields and if the user enters the wrong Controller ID, the
                  system will refuse to add that room.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} style={{ paddingTop: "50px" }}>
            <Card sx={{ maxWidth: 300 }} style={{ height: "450px" }}>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img
                  src={Aadpdf}
                  alt="account"
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                ></img>
              </div>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  4
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Exporting graphs and tables
                </Typography>
                <Typography variant="body2">
                  After entering the dashboard, go to the menu bar and select
                  Export to pdf to retrieve the data later, then select the date
                  and time you want to extract the data and press the print this
                  button to export to pdf.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
