import React, { useContext } from "react";
import { DetailCard } from "../../components/card";
import MainTab from "../../components/tabs";
import ImageCarousel from "../../components/images";
import { withRouter } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";

import "./Individual.css";

import styled from "styled-components";
import { LineItemContext, CheckoutIdContext } from "../../context/shopContext";

const MainContainer = styled.div`
  @media (max-width: 770px) {
    margin: 120px 0 0 -45px;
  }
`;

const FIRST_ADD_LINEITEMS = gql`
  mutation($item: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: { lineItems: $item }) {
      checkout {
        id
        webUrl
        lineItems(first: 20) {
          edges {
            node {
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
    $item: [CheckoutLineItemInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsAdd(lineItems: $item, checkoutId: $checkoutId) {
      checkout {
        id
        webUrl
        lineItems(first: 20) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
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
  const formik = useFormik({
    initialValues: {
      quantity: 1,
    },
    onSubmit: (values) => {
      HandleAddToCart(productInfo.variants.edges[0].node.id, values.quantity);
    },
  });
  // eslint-disable-next-line
  const { productHandle, productInfo } = props.location.state;
  const lineItem = useContext(LineItemContext);
  const [checkoutId, setCheckoutId] = useContext(CheckoutIdContext);

  const [updateCart] = useMutation(ADD_LINEITEMS, {
    onError: (error) =>
      alert("Not Added to cart. Try again") + console.log(error),
  });

  const [firstAddToCart] = useMutation(FIRST_ADD_LINEITEMS, {
    onCompleted: (data) =>
      setCheckoutId(data.checkoutCreate.checkout.id) + console.log(lineItem),
    onError: (error) =>
      alert("Not added to cart. Try again") + console.log(error),
  });

  const HandleAddToCart = (variantId, quantity) => {
    const item = [
      {
        variantId: variantId,
        quantity: quantity,
      },
    ];

    checkoutId === "" || checkoutId === null
      ? firstAddToCart({ variables: { item } })
      : updateCart({ variables: { item, checkoutId } });
    lineItem.push(item);
    return alert("Added to Cart");
  };
  return (
    <MainContainer>
      <div className="border-container individual">
        <div className="indi-main">
          <div className="container-1">
            <ImageCarousel arrays={productInfo.images.edges} />
          </div>
          <div className="container-2">
            <DetailCard
              productName={productInfo.title}
              availability={productInfo.totalInventory}
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              price={productInfo.priceRange.maxVariantPrice.amount}
              onClick={formik.handleSubmit}
              type="number"
            />
          </div>
          <div className="container-3">
            <MainTab defaultActiveKey="desc" desc={productInfo.description} />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default // connect(null, { addLineItem });
withRouter(IndividualProduct);
