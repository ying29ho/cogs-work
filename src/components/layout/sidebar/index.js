import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import { List, ListItem, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { gql, useQuery } from "@apollo/client";
import cx from "classnames";

import Home from "../../../pages/Home";
import SignUp from "../../../pages/SignUp";
import LogIn from "../../../pages/LogIn";
import CategoryProduct from "../../../pages/CategoryProduct";
// import IndividualProduct from "../../../pages/IndividualProduct";
import Policies from "../../../pages/Policies";
import Checkout from "../../../pages/Checkout";

// const drawerWidth = 100%;
const drawerWidth = 300;

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
    // width: "90%",

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    // width: "100%",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "inherit",
    backgroundColor: "#68A6BB",
    border: "none",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },

  link: {
    textDecoration: "none",
    color: "#FF286B",
    fontSize: "2rem",
    textShadow: "2px 2px #9E1842",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const query = gql`
  {
    productTypes(first: 10) {
      edges {
        node
      }
    }
  }
`;

export const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    Component: Home,
  },
  {
    path: "/category",
    exact: true,
    name: "Category",
    Component: CategoryProduct,
  },
  {
    path: "/checkout-cart",
    exact: true,
    name: "Checkout",
    Component: Checkout,
  },
  { path: "/policies", exact: true, name: "Policies", Component: Policies },
  {
    path: "/signup",
    exact: true,
    name: "Sign Up",
    Component: SignUp,
  },
  {
    path: "/login",
    exact: true,
    name: "Log In",
    Component: LogIn,
  },
];

const Sidebar = ({ ...props }) => {
  //To Get Category
  const {data} = useQuery(query);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className="menu" className={classes.root}>
      <AppBar
        style={{ background: "transparent", boxShadow: "none" }}
        position="fixed"
        className={cx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Grid container justify="flex-end">
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={cx(open && classes.hide)}
            style={{ textAlign: "right" }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
      </AppBar>

      <Drawer
        style={{ width: drawerWidth }}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={handleDrawerClose}
            edge="start"
            color="secondary"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <List>
          {routes.map(({ name, path, ...children }) => (
            <ListItem key={name}>
              <Link className={classes.link} to={path} key={name}>
                {name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
