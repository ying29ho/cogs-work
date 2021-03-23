import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";


const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_SHOPIFY_API,
    headers: {
      Accept: "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.REACT_APP_AUTH_TOKEN,
    },
  }),
  cache: new InMemoryCache(),
});
ReactDOM.render(
      <ApolloProvider client={client}>
        <React.StrictMode>
          <Router>
            <App />
          </Router>
        </React.StrictMode>
      </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
