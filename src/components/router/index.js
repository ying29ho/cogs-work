import React from "react";
import { Switch, Route } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import LogIn from "../../pages/LogIn";
import CategoryProduct from "../../pages/CategoryProduct";
import IndividualProduct from "../../pages/IndividualProduct";
import Policies from "../../pages/Policies";
import Checkout from "../../pages/Checkout";
import Delivery from "../../pages/Checkout/Delivery";
import Payment from "../../pages/Checkout/Payment";
import Confirm from "../../pages/Checkout/Confirm";

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
  {
    path: "/category",
    exact: true,
    name: "Category",
    Component: CategoryProduct,
  },
  {
    path: "/checkout-cart",
    exact: true,
    name: "checkout",
    Component: Checkout,
  },
  { path: "/policies", exact: true, name: "policies", Component: Policies },
  {
    path: "/individual:productId",
    exact: false,
    name: "Individual",
    Component: IndividualProduct,
  },
  {
    path: "/checkout-delivery",
    exact: true,
    name: "Delivery",
    Component: Delivery,
  },
  {
    path: "/checkout-payment",
    exact: true,
    name: "Payment",
    Component: Payment,
  },
  {
    path: "/checkout-confirm",
    exact: true,
    name: "Confirm",
    Component: Confirm,
  },
];

const Router = () => {
  const SubCat = () => {
    const { loading, data } = useQuery(FETCH_CATEGORIES);
    if (loading) return <p>Loading...</p>;
    data.productTypes.edges.map((each) =>
      routes.push({
        path: `/category-${each.node}`,
        exact: true,
        name: `${each.node}`,
        Component: CategoryProduct,
      })
    );
  };

  SubCat();
  return (
    <Switch>
      {routes.map(({ name, path, exact, Component }) =>
        path.includes("/category") ? (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => <CategoryProduct {...props} category={name} />}
          />
        ) : (
          <Route key={path} path={path} exact={exact} component={Component} />
        )
      )}
    </Switch>
  );
};

export default Router;
