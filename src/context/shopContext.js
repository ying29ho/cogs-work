import React from "react";

const LineItemContext = React.createContext([]);
const CheckoutIdContext = React.createContext();
const ThemeContext = React.createContext("light");

export { LineItemContext, ThemeContext, CheckoutIdContext };
