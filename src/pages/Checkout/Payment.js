import React from "react";
import { PaymentTable } from "../../components/table";
import Button from "../../components/button";
import { Link } from "react-router-dom";

import styled from "styled-components";
// import "./checkout.css";

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

  .btn-secondary {
    float: right;
  }
`;
const tableHeading = [
  {
    heading: "Payment Method",
    col: 12,
  },
];

const tableContent = [
  {
    id: 1,
    method: "Cash during Pick Up",
  },
  {
    id: 2,
    method: "Bank Transfer",
  },
  {
    id: 3,
    method: "Pocket",
  },
  {
    id: 4,
    method: "Card",
  },
];
const Payment = () => {
  return (
    <Container>
      <h2 data-title="&nbsp;Checkout - Payment&nbsp;">
        &nbsp;Checkout - Payment&nbsp;
      </h2>
      <h3 style={{ margin: "1em 0 1em 1em" }}>
        Please choose your preferred payment method
      </h3>
      <PaymentTable
        headings={tableHeading}
        content={tableContent}
        total="502.00"
      />
      <Link to="/checkout-confirm">
        <Button
          className="btn-right"
          variant="secondary"
          text="Confirm Payment"
        />
      </Link>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link to="checkout-delivery">
        <Button text="Back to Delivery" />
      </Link>
    </Container>
  );
};

export default Payment;
