import React, { useContext, useEffect } from "react";
import Router from "../router";
import Sidebar from "./sidebar";
import Title from "./title";
import "./Layout.css";

const Layout = () => {
  // const { lineItem } = useContext(ShopContext);
  return (
    <>
      <Title />
      <Sidebar />
      <Router />
    </>
  );
};

export default Layout;
