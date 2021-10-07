import React from "react";
import { AppBar, Toolbar, Link as LinkMat } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function HeaderSignUp() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <LinkMat to="/" color="inherit" underline="none" component={Link}>
            LOGO
          </LinkMat>
        </Toolbar>
      </AppBar>
    </>
  );
}
