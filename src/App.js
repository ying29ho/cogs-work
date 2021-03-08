import React, {  useState, useEffect } from "react";
// import { gql, useQuery } from "@apollo/client";

// import './App.scss';
import Layout from "./components/layout";
import { LineItemContext, CheckoutIdContext } from "../src/context/shopContext";
// import Cart from "./components/shopify/cart";

// const checkAndSetCheckoutID = () => {
//   const checkoutId_token = localStorage.getItem("checkoutId");
//   checkoutId_token === null ? localStorage.setItem("checkoutID", checkoutId)
//     ? null
//     : setCheckoutId(checkoutId_token)
// };

// const FETCH_EXISTING_LINEITEM = gql`
//   query($checkoutId: ID!) {
//     node(id: $checkoutId) {
//       ... on Checkout {
//         id
//         webUrl
//         lineItems(first: 50) {
//           edges {
//             node {
//               id
//               title
//               quantity
//               unitPrice {
//                 amount
//               }
//             }
//           }
//         }
//         lineItemsSubtotalPrice {
//           amount
//         }
//       }
//     }
//   }
// `;


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
