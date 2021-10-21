import React from "react";
import { AppBar, Toolbar, Link as LinkMat } from "@material-ui/core";
import { Link as Links } from "react-scroll";
import { makeStyles } from "@material-ui/core/styles";
import ButtonLogin from "./buttonLogin";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuLink: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <LinkMat to="/" color="inherit" underline="none" component={Link}>
            LOGO
          </LinkMat>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Links
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              className={classes.menuLink}
            >
              Home
            </Links>
            <Links
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              offset={750}
              duration={500}
              className={classes.menuLink}
            >
              About
            </Links>
            <Links
              activeClass="active"
              to="howTo"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              className={classes.menuLink}
            >
              How to
            </Links>
          </div>
          <ButtonLogin></ButtonLogin>
        </div>
      </Toolbar>
    </AppBar>
  );
}
