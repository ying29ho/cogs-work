import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import Client from "shopify-buy";
// import store from "./redux/store";
import typeBundle from "./types";
import App from "./App";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  // setContext,
} from "@apollo/client";
// import ShopProvider from "./context/shopContext";
import { LineItemContext, CheckoutIdContext } from "./context/shopContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  //SHOPIFY STOREFRONT API
  link: new HttpLink({
    uri: "https://cogs-work.myshopify.com/api/2021-01/graphql.json",
    headers: {
      Accept: "application/json",
      "X-Shopify-Storefront-Access-Token": "3895fab55b392eba0cb70d2381319aea",
    },
  }),
  //  SHOPIFY ADMIN API
  // link: new HttpLink({
  //   uri: "https://cogs-work.myshopify.com/admin/api/2021-01/graphql.json",
  //   headers: {
  //     Accept: "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     "X-Shopify-Access-Token": "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",
  //   },
  // }),
  cache: new InMemoryCache(),
});
// const lineItems = [];
// const [checkoutId, setCheckoutId] = useState("");

// const initialState = {};
// const apolloClient = createApolloClient();
// const store = createStore(initialState, { client: client });
ReactDOM.render(
  // <ShopProvider>
  // <CheckoutIdContext.Provider value={checkoutId, setCheckoutId}>
  //   <LineItemContext.Provider value={lineItems}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <Router>
            <App />
          </Router>
        </React.StrictMode>
      </ApolloProvider>,
  //   </LineItemContext.Provider>
  // </CheckoutIdContext.Provider>,
  // </ShopProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
