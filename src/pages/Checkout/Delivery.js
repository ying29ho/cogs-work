import React, { useState } from "react";
import { DeliveryTable } from "../../components/table";
import Button from "../../components/button";
import { Radio } from "../../components/form";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import styled from "styled-components";
import "./checkout.css";

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
    heading: "Delivery Method",
    col: 8,
  },
  { heading: "Date", col: 2 },
  { heading: "Price", col: 2 },
];

const tableContent = [
  {
    id: 1,
    value: 1,
    name: "pickUp",
    method: "Self Pick Up",
    date: "",
    price: 0,
  },
  {
    id: 2,
    value: 2,
    name: "delivery",
    method: "Shipping with Pos Laju",
    date: "",
    price: 4,
  },
];

const Delivery = () => {
  const [checked, setChecked] = useState(null);
  const formik = useFormik({
    initialValues: {
      pickUp: true,
      delivery: false,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container>
      <h2 data-title="&nbsp;Checkout - Delivery&nbsp;">
        &nbsp;Checkout - Delivery&nbsp;
      </h2>
      <h3 style={{ margin: "1em 0 1em 1em" }}>
        Please choose your preferred delivery method
      </h3>
      <DeliveryTable
        headings={tableHeading}
        content={tableContent}
        total="502.00"
        checked={checked}
        setChecked={setChecked}
      />
      <Link to="/checkout-payment">
        <Button
          className="btn-right"
          variant="secondary"
          text="Proceed to Payment"
        />
      </Link>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link to="checkout-cart">
        <Button text="Back to Cart" />
      </Link>
    </Container>
  );
};

export default Delivery;
