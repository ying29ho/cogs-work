import React from "react";
import Router from "../router";
import Sidebar from "./sidebar";
import Title from "./title";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <Title />
      <Sidebar />
      <Router />
    </>
  );
};

export default Layout;
