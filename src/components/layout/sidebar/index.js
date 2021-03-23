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
import CategoryProduct from "../../../pages/CategoryProduct";
import Policies from "../../../pages/Policies";
import Checkout from "../../../pages/Checkout";

const drawerWidth = 250;

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
    display: "block",
    // "&:hover": {
    //   textDecoration: "underline",
    //   color: "##ff286b",
    //   fontSize: "2rem",
    //   // textShadow: "2px 2px #9E1842",
    //   // display: "block",
    // },
  },
  sublink: {
    textDecoration: "none",
    color: "#FF286B",
    fontSize: "1.8rem",
    textShadow: "2px 2px #9E1842",
    display: "block",
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

const FETCH_CATEGORIES = gql`
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
];

const Sidebar = () => {
  const classes = useStyles();
   // eslint-disable-next-line 
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const subCategoryRoutes = [];
  const SubCat = () => {
    const { loading, data } = useQuery(FETCH_CATEGORIES);
    if (loading) return <p>Loading...</p>;
    data.productTypes.edges.map((each) =>
      subCategoryRoutes.push({
        path: `/category-${each.node}`,
        exact: true,
        name: `${each.node}`,
        Component: CategoryProduct,
      })
    );
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  SubCat();
  return (
     // eslint-disable-next-line 
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
          {routes.map(({ name, path, ...children }) =>
            name === "Category" ? (
              <ListItem key={name} className={classes.link}>
                {name}
                {subCategoryRoutes.map(({ name, path, ...children }, index) => (
                  <ListItem key={index} component="div">
                    <Link
                      className={classes.sublink}
                      to={path}
                      key={index}
                    >
                      {name}
                    </Link>
                  </ListItem>
                ))}
              </ListItem>
            ) : (
              <ListItem key={name}>
                <Link
                  className={classes.link}
                  to={path}
                  key={name}
                >
                  {name}
                </Link>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
