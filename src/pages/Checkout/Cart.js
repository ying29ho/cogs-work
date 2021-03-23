import React, { useContext } from "react";
import { EmptyTable, CartTable } from "../../components/table";
import ThemeButton from "../../components/button";
import { gql, useQuery } from "@apollo/client";
import Loading from "../Loading";
import Error from "../Error";
import { CheckoutIdContext } from "../../context/shopContext";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  .btn-secondary {
    float: right;
  }

  @media (max-width: 770px) {
    .btn {
      display: block;
      width: 100%;
      margin-bottom: 10px;
    }

    br {
      display: none;
    }
  }
`;
const MainContainer = styled.div`
  @media (max-width: 770px) {
    margin: 180px 0 0 -45px;
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
              variant {
                id
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
    mobile: 1,
  },
  { heading: "qty", col: 1, mobile: 1 },
  { heading: "item", col: 5, mobile: 7 },
  { heading: "unit price", col: 2, mobile: 0 },
  { heading: "total", col: 3, mobile: 3 },
];

const Cart = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const [checkoutId, setCheckoutId] = useContext(CheckoutIdContext);

  const handleCheckout = (webUrl) => {
    window.location.href = webUrl;
  };
  const handleBack = () => {
    history.push("/");
  };

  const FetchExisting = (checkoutId) => {
    const { loading, data, error, refetch } = useQuery(FETCH_CART, {
      variables: { checkoutId },
      pollInterval: 500,
    });

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    return (
      <MainContainer>
        <Container className="border-container">
          <h2 data-title="Checkout: Cart">Checkout: Cart</h2>
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
          <ThemeButton
            text="Continue Shopping"
            onClick={handleBack}
            disabled={false}
          />
        </Container>
      </MainContainer>
    );
  };

  const EmptyCart = () => {
    const total = 0;
    return (
      <MainContainer>
        <Container className="border-container">
          <h2 data-title="Checkout: Cart">Checkout: Cart</h2>
          <EmptyTable headings={tableHeading} total={total} />
          <ThemeButton
            className="btn-right"
            variant="secondary"
            text="Proceed to Checkout"
            disabled={true}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ThemeButton text="Continue Shopping" onClick={handleBack} />
        </Container>
      </MainContainer>
    );
  };
  return checkoutId === "" || checkoutId === null
    ? EmptyCart()
    : FetchExisting(checkoutId);
};

export default Cart;
