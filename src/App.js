import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";

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

const FETCH_EXISTING_LINEITEM = gql`
query($checkoutId: ID!){
  node(id: $checkoutId) {
      ... on Checkout {
        id
        webUrl
        lineItems(first: 50) {
          edges {
            node {
              id
              title
              quantity
              unitPrice {
                amount
              }
            }
          }
        }
        lineItemsSubtotalPrice {
          amount
        }
      }
    }
}
`;

const GetExistingData=(lineItem)=>{
  const checkoutId = localStorage.getItem("checkoutID");
  const { data } = useQuery(FETCH_EXISTING_LINEITEM, {
    variables: { checkoutId },
  });
  return(
    console.log("Cache data", data)
    // alert("elo")
// lineItem.push()
  )
}

function App() {
  // const [checkoutId, setCheckoutId] = useContext(CheckoutIdContext);
  // TODO: Tidy this part up
  const lineItem = [];
  // const [lineItem, setLineItem] = useState([]);
  const [checkoutId, setCheckoutId] = useState("");
  const checkoutID = localStorage.getItem("checkoutID");
  checkoutID===null||checkoutID==="" ? localStorage.setItem("checkoutID", checkoutId) : GetExistingData(lineItem)
  console.log("checkoutid",checkoutID);
  // localStorage.setItem("checkoutID", checkoutId);
  // checkAndSetCheckoutID();

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
