import React, {  useState, useEffect } from "react";

import Layout from "./components/layout";
import { LineItemContext, CheckoutIdContext } from "../src/context/shopContext";

function App() {
  const lineItem = [];
  const [checkoutId, setCheckoutId] = useState("");
  const checkoutID = localStorage.getItem("checkoutID");
  useEffect(() => {
    checkoutID === null || checkoutID === ""
      ? localStorage.setItem("checkoutID", checkoutId)
      : setCheckoutId(checkoutID);
  }, [checkoutId, checkoutID, setCheckoutId]);


  return (
    <div className="App">
      <CheckoutIdContext.Provider value={[checkoutId, setCheckoutId]}>
        <LineItemContext.Provider value={lineItem}>
          <Layout />
        </LineItemContext.Provider>
      </CheckoutIdContext.Provider>
    </div>
  );
}

export default App;
