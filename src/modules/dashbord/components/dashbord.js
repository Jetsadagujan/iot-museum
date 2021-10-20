import React, { useContext } from "react";
import clsx from "clsx";
import { Route, Switch } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logout from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Index from "@material-ui/icons/List";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Link } from "@material-ui/core";
import firebaseConfig from "../../../firebase/config/config";
import { AuthContext } from "../../../context/componentss/context";
import { Redirect } from "react-router";
import DashbordItem from "./dashbordItems";
import ExamplePDF from "./topdf/toPDF";
import { Skeleton } from "@material-ui/lab";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Dashbord() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { currentUser, userContext } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (currentUser) {
    return (
      <div className={classes.root}>
        {console.log(currentUser)}
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" color="inherit" underline="none">
              LOGO
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <ListItem button key="Index">
            <ListItemIcon>
              <Index />
            </ListItemIcon>
            <Link href="/dashbord/index" color={"textPrimary"} underline="none">
              <ListItemText primary="Index"></ListItemText>
            </Link>
          </ListItem>
          <Divider />
          <ListItem button key="ExportPDF">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Link
              href="/dashbord/exportpdf"
              color={"textPrimary"}
              underline="none"
            >
              <ListItemText primary="ExportPDF"></ListItemText>
            </Link>
          </ListItem>
          <Divider />
          <ListItem
            button
            key="LogOut"
            onClick={() => firebaseConfig.auth().signOut()}
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <Link href="/" color={"textPrimary"} underline="none">
              <ListItemText primary="Logout"></ListItemText>
            </Link>
          </ListItem>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Toolbar></Toolbar>
          <div>
            {userContext ? (
              <>
                <Switch>
                  <Route path="/dashbord/exportpdf">
                    <ExamplePDF></ExamplePDF>
                  </Route>
                  <Route path="/dashbord/index">
                    <DashbordItem></DashbordItem>
                  </Route>
                  <Route path="/dashbord">
                    <DashbordItem></DashbordItem>
                  </Route>
                </Switch>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton variant="text" width={"80%"} />
                  <Skeleton variant="rect" width={"80%"} height={100} />
                  <Skeleton variant="rect" width={"80%"} height={300} />
                </div>
              </>
            )}
          </div>
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
  return <Redirect to="home"></Redirect>;
}
