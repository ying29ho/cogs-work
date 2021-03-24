import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { gql, useMutation, useQuery } from "@apollo/client";

import { CheckoutIdContext } from "../../context/shopContext";
import { Radio } from "../form";

import styled from "styled-components";
import "./table.scss";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;

  th {
    text-align: center;
    border-bottom: 2px solid #05d9e8;
    border-bottom-width: 100%;
  }
  td {
    color: #d1f7ff;
    font-size: 1.5rem;
    text-align: center;
  }

  h3 {
    margin: 0;
  }

  .radio > label {
    font-size: 1.5rem;
  }

  .radio {
    text-align: left;
    margin-left: 2rem;
  }
`;

const REMOVE_LINEITEM = gql`
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      checkout {
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
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

const FETCH_ITEM_PRICE = gql`
  query($productId: ID!) {
    node(id: $productId) {
      ... on ProductVariant {
        id
        priceV2 {
          amount
          currencyCode
        }
      }
    }
  }
`;

const TableHeading = ({ headings }) => {
  return (
    <>
      <thead>
        <tr>
          {headings.map(({ heading, col, mobile }, index) => (
            <th
              key={index}
              className={heading === "unit price" ? "d-none d-sm-block" :  null}
              colSpan={col}
            >
              <h3>{heading}</h3>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
const EmptyTable = ({ headings, total }) => {
  return (
    <Container>
      <Table striped hover borderless>
        <TableHeading headings={headings} />
        <tbody>
          <tr className="last-row">
            <td
              colSpan={
                headings[0].col +
                headings[1].col +
                headings[2].col +
                headings[3].col +
                headings[4].col
              }
            >
              Nothing is here....yet...
            </td>
          </tr>
          <tr className="last-row">
            <td colSpan={headings[0].col} />
            <td colSpan={headings[1].col} />
            <td colSpan={headings[2].col} />
            <th colSpan={headings[3].col}>
              <h3>Total</h3>
            </th>
            <th colSpan={headings[4].col}>
              <h3>BND {total}</h3>
            </th>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

const ItemPrice = ({ productId, colSpan1, colSpan2, quantity }) => {
  const { data: price, loading } = useQuery(FETCH_ITEM_PRICE, {
    variables: { productId },
    skip: productId == null,
  });
  if (loading)
    return (
      <>
        <td className="d-none d-sm-block">...</td>
        <td>...</td>
      </>
    );
  return (
    <>
      <td colSpan={colSpan1} className="d-none d-sm-block">
        {price.node.priceV2.currencyCode}&nbsp;
        {Number.parseFloat(price.node.priceV2.amount).toFixed(2)}
      </td>
      <td colSpan={colSpan2}>
        {price.node.priceV2.currencyCode} &nbsp;
        {Number.parseFloat(quantity * price.node.priceV2.amount).toFixed(2)}
      </td>
    </>
  );
};

const CartTable = ({ headings, content, total }, refetch) => {
   // eslint-disable-next-line 
  const [checkoutId, setCheckoutId] = useContext(CheckoutIdContext);
  const [removeItemFromCart] = useMutation(REMOVE_LINEITEM, {
    onCompleted: (data) => refetch,
    onError: (error) => alert("not removed") + console.log(error),
  });
  const removeItem = (checkoutId, lineItemIds) => {
    removeItemFromCart({ variables: { checkoutId, lineItemIds } });
  };
  return (
    <Container>
      <Table responsive striped hover borderless size="sm" width="50vw">
        <TableHeading headings={headings} />
        <tbody>
          {content.map((each, index) => (
            <tr key={index}>
              <td
                colSpan={
                  headings[0].col
                }
              >
                <IconButton
                  onClick={() => removeItem(checkoutId, each.node.id)}
                  edge="start"
                  color="secondary"
                >
                  <CloseIcon />
                </IconButton>
              </td>
              <td colSpan={headings[1].col} >{each.node.quantity}</td>
              <td
                colSpan={
                  headings[2].col
                }
              >
                {each.node.title}
              </td>
              <ItemPrice
                productId={each.node.variant.id}
                colSpan1={
                  headings[3].col
                }
                colSpan2={
                  headings[4].col
                }
                quantity={each.node.quantity}
              />
            </tr>
          ))}
          <tr className="last-row">
            <td colSpan={headings[0].col} />
            <td colSpan={headings[1].col} />
            <td colSpan={headings[2].col} />
            <th colSpan={headings[3].col}>
              <h3>Total</h3>
            </th>
            <th colSpan={headings[4].col}>
              <h3>
                BND&nbsp;
                {Number.parseFloat(total).toFixed(2)}
              </h3>
            </th>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

const DeliveryTable = ({ headings, content, total, formik }) => {
  return (
    <Container>
      <Table responsive striped hover borderless>
        <thead>
          <tr>
            {headings.map(({ heading, col }, index) => (
              <th colSpan={col} key={index}>
                <h3
                  style={
                    heading[0]
                      ? { textAlign: "left", marginLeft: "2rem" }
                      : { textAlign: "center" }
                  }
                >
                  {heading}
                </h3>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map(({ id, method, date, price, value, name }, index) => (
            <tr key={index}>
              <td colSpan={headings[0].col}>
                <Radio
                  label={method}
                  name={name}
                  value={value}
                  // checked={setChecked(value)}
                />
              </td>
              <td colSpan={headings[1].col}>{date}</td>
              <td colSpan={headings[2].col}>
                {price > 0 ? `BND ${price}` : "free"}
              </td>
            </tr>
          ))}

          <tr hover="false">
            <td colSpan={headings[0].col} />

            <th colSpan={headings[1].col} style={{ borderBottom: "none" }}>
              {/* <hr style={{padding: '0'}}/> */}
              <h3>Delivery Total</h3>
            </th>
            <th colSpan={headings[2].col} style={{ borderBottom: "none" }}>
              {/* <hr style={{padding: '0'}}/> */}
              <h3>BND </h3>
            </th>
          </tr>
          <tr hover="false">
            <td colSpan={headings[0].col} />

            <th colSpan={headings[1].col}>
              {/* <hr style={{padding: '0'}}/> */}
              <h3>Order Total</h3>
            </th>
            <th colSpan={headings[2].col}>
              {/* <hr style={{padding: '0'}}/> */}
              <h3>BND {total}</h3>
            </th>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

const PaymentTable = ({ headings, content, total }) => {
  return (
    <Container>
      <Table responsive striped hover borderless>
        <thead>
          <tr>
            {headings.map(({ heading, col }, index) => (
              <th colSpan={col} key={index}>
                <h3
                  style={
                    heading[0]
                      ? { textAlign: "left", marginLeft: "2rem" }
                      : { textAlign: "center" }
                  }
                >
                  {heading}
                </h3>
                {/* <hr style={{width: "100%"}} /> */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map(({ id, method }, index) => (
            <tr key={index}>
              <td colSpan={headings[0].col}>
                <Radio label={method} />
              </td>
            </tr>
          ))}
          <tr hover="false">
            <td colSpan="8" />
            <th style={{ borderBottom: "none" }} colSpan="2">
              {/* <hr style={{padding: '0'}}/> */}
              <h3>Delivery Total</h3>
            </th>
            <th style={{ borderBottom: "none" }} colSpan="2">
              {/* <hr style={{padding: '0'}}/> */}
              <h3>BND </h3>
            </th>
          </tr>
          <tr hover="false">
            <td colSpan="8" />

            <th colSpan="2">
              {/* <hr style={{padding: '0'}}/> */}
              <h3>Order Total</h3>
            </th>
            <th colSpan="2">
              {/* <hr style={{padding: '0'}}/> */}
              <h3>BND {total}</h3>
            </th>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export { EmptyTable, CartTable, DeliveryTable, PaymentTable };
