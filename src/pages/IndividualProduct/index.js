// import Title from "../../components/layout/title";
import React, { useContext, useState } from "react";
// import { Input, Checkbox, Select } from "../../components/form";
// import Form from "react-bootstrap/Form";
// import CardColumns from "react-bootstrap/CardColumns";
import { DetailCard } from "../../components/card";
import MainTab from "../../components/tabs";
import ImageCarousel from "../../components/images";
import { withRouter } from "react-router";
import { gql, useMutation } from "@apollo/client";

// import { connect } from "react-redux";
// import {addLineItem} from "../../redux/actions";

import "./Individual.css";

import styled from "styled-components";
import { LineItemContext, CheckoutIdContext } from "../../context/shopContext";

const Container = styled.div`
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

  @media (max-width: 500px) {
    width: 95vw;
    margin: 120px 0 0 -40px;

    h2 {
      display: none;
    }
  }
`;

const FIRST_ADD_LINEITEMS = gql`
  mutation($lineItem: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: { lineItems: $lineItem }) {
      checkout {
        id
        webUrl
        lineItems(first: 20){
        edges{
          node{
            id
            title
            quantity
          }
        }
      }
      }
    }
  }
`;

const ADD_LINEITEMS = gql`
  mutation checkoutLineItemsAdd(
    $lineItem: [CheckoutLineItemInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsAdd(lineItems: $lineItem, checkoutId: $checkoutId) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;


const IndividualProduct = (props) => {
  const { productHandle, productInfo } = props.location.state;
  //cannot move this
  // const lineItem = useContext(LineItemContext);
  const [checkoutId, setCheckoutId] = useContext(CheckoutIdContext);

  console.log("checkoutid", checkoutId);
  console.log(typeof checkoutId);

  const [updateCart] = useMutation(ADD_LINEITEMS, {
    onCompleted: (data) => console.log("update add data", data),
    onError: (error) =>
      alert("Not Added to cart. Try again") + console.log(error),
  });

  const [firstAddToCart] = useMutation(FIRST_ADD_LINEITEMS, {
    onCompleted: (data) => setCheckoutId(data.checkoutCreate.checkout.id) + console.log("first add data", data) + console.log("new checkout id",checkoutId),
    onError: (error) =>
      alert("Not added to cart. Try again") + console.log(error),
  });

  const HandleAddToCart = (variantId, quantity) => {
    // const newItem = {
    //   variantId: variantId,
    //   quantity: quantity,
    // };
    // lineItem.push(newItem);
    const lineItem = [
      {
        "variantId": variantId,
        "quantity": quantity
      },
    ];
    console.log("pushed item", lineItem);
    // console.log(typeof lineItem);

    checkoutId === "" || checkoutId === null
      ? firstAddToCart({ variables: {lineItem} })
      : updateCart({ variables: { lineItem, checkoutId } });
    // console.log(lineItem);
    return alert("Added to Cart");
  };
  return (
    <Container className="individual">
      <h2 data-title={productInfo.title}>{productInfo.title}</h2>

      <div className="indi-main">
        <div className="container-1">
          <ImageCarousel arrays={productInfo.images.edges} />
        </div>
        <div className="container-2">
          <DetailCard
            productName={productInfo.title}
            availability={productInfo.totalInventory}
            quantity="1"
            price={productInfo.priceRange.maxVariantPrice.amount}
            onClick={() =>
              HandleAddToCart(productInfo.variants.edges[0].node.id, 1)
            }
          />
        </div>
        <div className="container-3">
          <MainTab defaultActiveKey="desc" desc={productInfo.description} />
        </div>
      </div>
    </Container>
  );
};

export default // connect(null, { addLineItem });
withRouter(IndividualProduct);
