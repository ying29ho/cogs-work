import React, { useContext, useEffect } from "react";
import { EmptyTable, CartTable } from "../../components/table";
import ThemeButton from "../../components/button";
import { gql, useQuery } from "@apollo/client";
import Loading from "../Loading";
import Error from "../Error";
import { LineItemContext, CheckoutIdContext } from "../../context/shopContext";

import styled from "styled-components";

import "./checkout.css";

const Container = styled.div`
  @media (max-width: 500px) {
    margin-top: 180px;
  }
  border: 5px solid #ff286b;
  border-radius: 3px;
  border-bottom: 50px solid #ff286b;
  padding: 20px 20px 60px 20px;

  height: auto;
  width: 80%;
  transform: translateX(15%);
  margin-top: 100px;

  h2 {
    background: #005678;
    height: 10vh;
    width: auto;
    margin: -100px 0 0 0;
  }

  .btn-secondary {
    float: right;
  }
`;

const FETCH_CART = gql`
  query($checkoutId: ID!) {
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

const tableHeading = [
  {
    heading: "remove",
    col: 1,
  },
  { heading: "qty", col: 1 },
  { heading: "item", col: 5 },
  { heading: "unit price", col: 2 },
  { heading: "total price", col: 3 },
];

const Cart = () => {
  // const lineItem = useContext(LineItemContext);
  const [checkoutId, setCheckoutId] = useContext(CheckoutIdContext);

  const handleCheckout = (webUrl) => {
    window.location.href = webUrl;
  };
  console.log("checkut id at cart", checkoutId);
  console.log(typeof checkoutId);

  const FetchExisting = (checkoutId) => {
    const { loading, data, error, refetch } = useQuery(FETCH_CART, {
      variables: { checkoutId },
    });
    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    return (
      <Container>
        {console.log("CART DATA", data)}
        {console.log("content", data.node.lineItems.edges)}
        <h2 data-title="&nbsp;Checkout - Cart&nbsp;">
          &nbsp;Checkout - Cart&nbsp;
        </h2>
        <CartTable
          headings={tableHeading}
          refetch={refetch}
          content={data.node.lineItems.edges}
          total={data.node.lineItemsSubtotalPrice.amount}
        />
        <ThemeButton
          className="btn-right"
          variant="secondary"
          text="Proceed to Checkout"
          disabled={data.node.lineItems.edges.length === 0 ? true : false}
          onClick={() => handleCheckout(data.node.webUrl)}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <ThemeButton text="Continue Shopping" />
      </Container>
    );
  };

  const EmptyCart = ()=>{
    const total = 0;
    return(
     < Container>
        <h2 data-title="&nbsp;Checkout - Cart&nbsp;">
          &nbsp;Checkout - Cart&nbsp;
        </h2>
        <EmptyTable
          headings={tableHeading}
          // refetch={refetch}
          // content={data.node.lineItems.edges}
          total={total}
        />
        <ThemeButton
          className="btn-right"
          variant="secondary"
          text="Proceed to Checkout"
          disabled={true}
          // onClick={() => handleCheckout(data.node.webUrl)}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <ThemeButton text="Continue Shopping" />
      </Container>
    )
  }
return(checkoutId===""||checkoutId===null ?  EmptyCart() :  FetchExisting(checkoutId))
};

export default Cart;
